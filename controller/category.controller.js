import "../modles/connection.js";
import CategorySchemaModel from "../modles/category.model.js";
import url from 'url';
import path from 'path';
import rs from 'randomstring';

export const save=async(req,res)=>{
    
 try {
  // CHANGE: Improved ID generation to use max ID instead of length
  // WHY: If documents are deleted, length-based ID will cause duplicate key errors
  const categoryList = await CategorySchemaModel.find().sort({_id:-1}).limit(1);
  const _id = categoryList.length === 0 ? 1 : categoryList[0]._id + 1;

  const caticon = req.files.caticon;
  const caticonnm = Date.now() + "_" + caticon.name;   

  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const uploadfilepath = path.join(__dirname,'../../ui/public/assets/uploads/caticons',caticonnm);

  // CHANGE: Added 'name' field populated from 'catnm'
  // WHY: To satisfy the unique index on 'name' in the MongoDB collection
  const cDetails = {...req.body, "caticonnm": caticonnm, "_id": _id, "name": req.body.catnm}; 
  
  await CategorySchemaModel.create(cDetails);
  caticon.mv(uploadfilepath);
  res.status(201).json({"status":true});  
 }
 catch (error) {
  console.log("Database Error:", error);
  // Return the error message to the UI for easier debugging
  res.status(500).json({"status":false, "error": error.message});   
 }
};

export const fetch=async(req,res)=>{
  console.log(req);
  var condition_obj=req.query; 
  var cList=await CategorySchemaModel.find(condition_obj);
  if(cList.length!=0)
    res.status(200).json({"status":true,"info":cList});
  else
    res.status(404).json({"status":false});    
};


export var deleteUser=async(req,res)=>{
  try{
    let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(cDetails){
      let category=await CategorySchemaModel.deleteOne(JSON.parse(req.body.condition_obj));   
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

export var update=async(req,res)=>{
  try{
    let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(cDetails){
      let category=await CategorySchemaModel.updateMany(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)});   
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