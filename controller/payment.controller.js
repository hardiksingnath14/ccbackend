import "../modles/connection.js";
import PaymentSchemaModel from "../modles/payment.module.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

import crypto from "crypto";

async function getInstance() {
  const { default: Razorpay } = await import("razorpay");
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || ""
  });
}

export const createOrder = async (req, res) => {
    try {
        const { name, email, amount } = req.body;

        const instance = await getInstance();
        if (!instance.key_id || !instance.key_secret) {
            return res.status(500).json({ status: false, message: "Payment keys not configured" });
        }

        const options = {
            amount: Number(amount) * 100,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`
        };

        const order = await instance.orders.create(options);

        const last = await PaymentSchemaModel.findOne().sort({ _id: -1 });
        const _id = last ? last._id + 1 : 1;

        await PaymentSchemaModel.create({
            _id,
            name,
            email,
            amount,
            orderId: order.id,
            status: "created",
            info: new Date()
        });

        res.status(200).json({ status: true, order, keyId: instance.key_id });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const instance = await getInstance();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ status: false, message: "Missing payment fields" });
        }

        const expected = crypto.createHmac("sha256", instance.key_secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (expected !== razorpay_signature) {
            await PaymentSchemaModel.updateOne({ orderId: razorpay_order_id }, { $set: { status: "failed", paymentId: razorpay_payment_id } });
            return res.status(400).json({ status: false, message: "Invalid signature" });
        }

        await PaymentSchemaModel.updateOne({ orderId: razorpay_order_id }, { $set: { status: "paid", paymentId: razorpay_payment_id } });

        res.status(200).json({ status: true });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

export const fetch = async (req, res) => {
    try {
        const condition = req.query || {};
        const payments = await PaymentSchemaModel.find(condition).sort({ _id: -1 });
        res.status(200).json({ status: true, info: payments });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};
