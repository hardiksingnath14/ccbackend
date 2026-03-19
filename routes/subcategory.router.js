import express from 'express';

//to link controller
import * as SubCategoryController from '../controller/subcategory.controller.js';

const router=express.Router();

router.post("/save",SubCategoryController.save);

router.get("/fetch",SubCategoryController.fetch);

router.delete("/delete",SubCategoryController.deleteUser);

router.patch("/update",SubCategoryController.update);

export default router;