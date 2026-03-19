import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
    _id: Number,
    name: String,
    email: String,
    amount: Number,
    orderId: String,
    paymentId: String,
    status: String,
    info: Date
});

const PaymentSchemaModel = mongoose.model('payment_details', PaymentSchema);
export default PaymentSchemaModel;
