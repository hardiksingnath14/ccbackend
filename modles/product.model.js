import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const ProductModel = mongoose.Schema({
    _id: Number,
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    // ── Owner field — links every product to the user who added it ──
    userEmail: {
        type: String,
        required: true,
        trim: true,
        index: true,   // makes filtering by user fast
    },
    pdf: {
        type: String,
        required: false, // Not all products may have a PDF
    },
    review: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    reviewedBy: {
        type: String,
        required: false,
    },
});

ProductModel.plugin(mongooseUniqueValidator);

const ProductSchema = mongoose.model("Product_details", ProductModel);
export default ProductSchema;