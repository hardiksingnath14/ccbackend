import "../modles/connection.js";
import url from 'url';
import path from 'path';

//to link subcategory model
import SubCategorySchemaModel from "../modles/subcategory.model.js";

export const save = async (req, res) => {
    try {
        const subcategoryList = await SubCategorySchemaModel.find().sort({ _id: -1 });
        const _id = subcategoryList.length > 0 ? subcategoryList[0]._id + 1 : 1;

        const subcaticon = req.files.subcaticon;
        const subcaticonnm = Date.now() + "_" + subcaticon.name;

        const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
        const uploadpath = path.join(__dirname, '../../Ui/public/assets/uploads/subcaticons', subcaticonnm);

        await subcaticon.mv(uploadpath);

        const newSubCategory = { ...req.body, _id, subcaticonnm };
        await SubCategorySchemaModel.create(newSubCategory);

        res.status(201).json({ "status": true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": false, "error": "Server error" });
    }
};

export const fetch=async(req,res)=>{
  var condition_obj=req.query; 
  var scList=await SubCategorySchemaModel.find(condition_obj);
  if(scList.length!=0)
    res.status(200).json({"status":true,"info":scList});
  else
    res.status(404).json({"status":false});    
};


export var deleteUser=async(req,res)=>{
  try{
    let cDetails = await SubCategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(cDetails){
      let category=await SubCategorySchemaModel.deleteOne(JSON.parse(req.body.condition_obj));   
      if(category)
        res.status(200).json({"status":true});
      else
        res.status(500).json({"status": false});
    }
    else
      res.status(404).json({"status":"Requested resource not available"});
  }catch(error){
    res.status(500).json({"status":false});        
  };
};

export var update = async (req, res) => {
    try {
        let condition = JSON.parse(req.body.condition_obj);
        let content = JSON.parse(req.body.content_obj);

        if (req.files && req.files.subcaticon) {
            const subcaticon = req.files.subcaticon;
            const subcaticonnm = Date.now() + "_" + subcaticon.name;
            const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
            const uploadpath = path.join(__dirname, '../../Ui/public/assets/uploads/subcaticons', subcaticonnm);

            await subcaticon.mv(uploadpath);
            content.subcaticonnm = subcaticonnm;
        }

        let cDetails = await SubCategorySchemaModel.findOne(condition);
        if (cDetails) {
            let category = await SubCategorySchemaModel.updateMany(condition, { $set: content });
            if (category)
                res.status(200).json({ "status": true });
            else
                res.status(500).json({ "status": false });
        }
        else
            res.status(404).json({ "status": "Requested resource not available" });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ "status": false, "error": error.message });
    };
};