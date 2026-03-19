import * as ProductController from "../controller/product.controller.js"
import express from 'express';
const router = express.Router();
router.post("/save",ProductController.save);
router.get("/fetch",ProductController.fetch);
router.delete("/delete",ProductController.deleteProduct);
router.patch("/update",ProductController.update);
export default router; 