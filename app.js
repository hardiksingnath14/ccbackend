import express from 'express';
import bodyParser from 'body-parser';
import UserRouter from "./routes/user.router.js";
import ProductRouter from "./routes/porduct.router.js";
import CategoryRouter from "./routes/category.router.js";
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from "dotenv";
import ForgetPassword from './mailer_api/fp.controller.js';
import SubCategoryRouter from "./routes/subcategory.router.js";
import PaymentRouter from "./routes/payment.router.js";
import aiChatRoute from "./routes/aiChat.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/ai", aiChatRoute);
app.use("/user",UserRouter);
app.use("/product",ProductRouter);
app.use("/category",CategoryRouter);
app.use("/subcategory",SubCategoryRouter);
app.use("/payment", PaymentRouter);

//route for forgetpassword
app.post("/forgetpassword",ForgetPassword);
app.listen(3001);
console.log("Server invoked at port http://localhost:3001");