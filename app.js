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
app.use("/ai", aiChatRoute);
app.use("/user",UserRouter);
app.use("/product",ProductRouter);
app.use("/category",CategoryRouter);
app.use("/subcategory",SubCategoryRouter);
app.use("/payment", PaymentRouter);

//route for forgetpassword
app.post("/forgetpassword",ForgetPassword);

// Add a simple health check route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

// Export the app for Vercel serverless functions
export default app;