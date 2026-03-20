import "../modles/connection.js";
import ProductSchemaModel from "../modles/product.model.js";
import url from 'url';
import path from 'path';

// POST a new product
export const save = async (req, res) => {
    try {
        const productList = await ProductSchemaModel.find().sort({ _id: -1 });
        const _id = productList.length > 0 ? productList[0]._id + 1 : 1;

        const { title, category, subcategory, description, price, userEmail } = req.body;
        
        // Check if files are present
        if (!req.files || !req.files.icon) {
            return res.status(400).json({ status: false, error: "Product icon is required" });
        }

        const productIcon = req.files.icon;
        const productIconName = `${Date.now()}_${productIcon.name}`;

        const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
        const uploadPath = path.join(__dirname, "../../Ui/public/assets/uploads/producticons", productIconName);
        await productIcon.mv(uploadPath);

        // Handle PDF upload
        let pdfName = null;
        if (req.files && req.files.pdf) {
            const productPdf = req.files.pdf;
            pdfName = `${Date.now()}_${productPdf.name}`;
            const pdfUploadPath = path.join(__dirname, "../../Ui/public/assets/uploads/productpdfs", pdfName);
            await productPdf.mv(pdfUploadPath);
        }

        const newProduct = {
            _id,
            title,
            category,
            subcategory,
            description,
            price,
            userEmail,
            icon: productIconName,
            pdf: pdfName,
        };
       console.log(newProduct)
        await ProductSchemaModel.create(newProduct);
        res.status(201).json({ status: true, msg: "Product added successfully" });

    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ status: false, error: "Server error while saving product" });
    }
};

// GET all products or filter by user email
export const fetch = async (req, res) => {
    try {
        const { email } = req.query;
        const condition = email ? { userEmail: email } : {};
        const products = await ProductSchemaModel.find(condition);
        res.status(200).json({ result: true, info: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ result: false, error: "Failed to fetch products" });
    }
};

// ── DELETE — verifies ownership before deleting ──
export var deleteProduct = async (req, res) => {
    try {
        const userEmail = req.body.userEmail;

        let condition = req.body.condition_obj
            ? JSON.parse(req.body.condition_obj)
            : { _id: req.body._id };

        // Add userEmail to condition to prevent cross-user deletion
        if (userEmail) condition.userEmail = userEmail;

        const productDetails = await ProductSchemaModel.findOne(condition);

        if (!productDetails) {
            return res.status(403).json({
                "status": false,
                "message": "Product not found or you don't have permission to delete it"
            });
        }

        await productDetails.deleteOne();
        res.status(200).json({ "status": true });
    }
    catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({ "status": false });
    }
};

// ── UPDATE — verifies ownership before updating ──
export var update = async (req, res) => {
    try {
        const userEmail = req.body.userEmail;

        let condition = JSON.parse(req.body.condition_obj);
        let content   = JSON.parse(req.body.content_obj);

        // Add userEmail to condition to prevent cross-user update (only if not admin)
        // If userEmail is provided, we filter by it.
        if (userEmail) condition.userEmail = userEmail;

        const productDetails = await ProductSchemaModel.findOne(condition);

        if (!productDetails) {
            return res.status(403).json({
                "status": false,
                "message": "Product not found or you don't have permission to update it"
            });
        }

        await ProductSchemaModel.updateOne(condition, { $set: content });
        res.status(200).json({ "status": true });
    }
    catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({ "status": false });
    }
};