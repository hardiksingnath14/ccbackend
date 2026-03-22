import express from 'express';
import * as PaymentController from '../controller/payment.controller.js';

const router = express.Router();

router.post("/createOrder", PaymentController.createOrder);
router.post("/verifyPayment", PaymentController.verifyPayment);
router.get("/fetch", PaymentController.fetch);

export default router;
