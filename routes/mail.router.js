import express from 'express';
import * as MailController from '../controller/mail.controller.js';

const router = express.Router();

router.post("/forgetpassword", MailController.forgetPassword);

export default router;
