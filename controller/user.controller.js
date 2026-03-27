import "../modles/connection.js";
import UserSchemaModel from "../modles/user.model.js";
import jwt from 'jsonwebtoken';
import rs from "randomstring";
import sendMail from "../mailer_api/mailer.js";
import bcrypt from "bcrypt";
import axios from 'axios';
export const save = async (req, res) => {

  try {
    const users = await UserSchemaModel.find();
    const l = users.length;
    const _id = l === 0 ? 1 : users[l - 1]._id + 1;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const userDetails = { ...req.body, password: hashedPassword, _id: _id, role: "user", status: 0, info: new Date() };
    await UserSchemaModel.create(userDetails);
    //console.log(userDetails)
    sendMail(req.body.email, req.body.password);
    res.status(200).json({ status: true });

  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password, captchaToken } = req.body;

  // 1. Verify reCAPTCHA (MANDATORY)
  if (!captchaToken) {
    return res.status(400).json({ status: false, msg: "Please solve the reCAPTCHA to continue" });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6Le4m5MsAAAAAOdMO9ZSQaJPBdT39AN4lX9DU554";
    
    // Google reCAPTCHA requires data to be sent as application/x-www-form-urlencoded
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: captchaToken
        }
      }
    );

    if (!response.data.success) {
      console.log("reCAPTCHA Fail Details:", response.data);
      return res.status(400).json({ status: false, msg: "reCAPTCHA verification failed" });
    }
  } catch (error) {
    console.error("reCAPTCHA Error:", error);
    return res.status(500).json({ status: false, msg: "Error verifying reCAPTCHA" });
  }

  // 2. Normal Login Authentication
  const users = await UserSchemaModel.find({ email: email, status: 1 }).select("+password");
  if (users.length > 0) {
    const match = await bcrypt.compare(password, users[0].password);
    if (match) {
      const payload = users[0].email;
      const key = rs.generate(20);
      const token = jwt.sign(payload, key);
      res.status(200).json({ "status": true, "token": token, "info": users[0] });
    }
    else {
      res.status(404).json({ "status": false, msg: "Invalid password" });
    }
  }
  else {
    res.status(404).json({ "status": false, msg: "User not found or account not verified" });
  }
};

export const fetch = async (req, res) => {
  var condition_obj = req.query;
  var userList = await UserSchemaModel.find(condition_obj);
  if (userList.length != 0)
    res.status(200).json({ "status": true, "info": userList });
  else
    res.status(404).json({ "status": false });
};


export var deleteUser = async (req, res) => {
  try {
    let userDetails = await UserSchemaModel.findOne(req.body);
    if (userDetails) {
      let user = await UserSchemaModel.deleteOne(req.body);
      if (user)
        res.status(200).json({ "status": true });
      else
        res.status(500).json({ "status": false });
    }
    else
      res.status(404).json({ "status": "Requested resource not available" });
  } catch (error) {
    res.status(500).json({ "status": false });
  };
};

export var update = async (req, res) => {
  try {
    // CHANGE: Hash password on update to avoid storing plaintext and to make login work
    // WHY: bcrypt.compare during login expects a hashed DB value
    console.log("Update Request Body:", req.body);
    const { condition_obj = {}, content_obj = {} } = req.body;
    let userDetails = await UserSchemaModel.findOne(condition_obj);
    if (userDetails) {
      if (content_obj.password) {
        const saltRounds = 10;
        content_obj.password = await bcrypt.hash(content_obj.password, saltRounds);
      }
      let user = await UserSchemaModel.updateOne(condition_obj, { $set: content_obj });
     // console.log(user)
      if (user)
        res.status(200).json({ "status": true });
      else
        res.status(500).json({ "status": false });
    }
    else
      res.status(404).json({ "status": "Requested resource not available" });
  } catch (error) {
    res.status(500).json({ "status": false });
  };
};

export const updatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    let user = await UserSchemaModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(404).json({ status: false, msg: "Old password incorrect" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    await UserSchemaModel.updateOne({ email }, { $set: { password: hashedPassword } });
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

export const googleClient = async (req, res) => {
    try {
        const clientId = process.env.GOOGLE_CLIENT_ID || "";
        res.status(200).json({ status: true, clientId });
    } catch (error) {
        res.status(500).json({ status: false });
    }
}

export const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;
        if (!idToken) return res.status(400).json({ status: false, msg: "idToken required" });

        const resp = await globalThis.fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
        if (!resp.ok) return res.status(401).json({ status: false, msg: "invalid_google_token" });

        const info = await resp.json();

        const email = info.email || "";
        const name = info.name || (email ? email.split("@")[0] : "user");
        if (!email) return res.status(400).json({ status: false, msg: "email_missing" });

        let user = await UserSchemaModel.findOne({ email });
        if (!user) {
            const users = await UserSchemaModel.find();
            const _id = users.length === 0 ? 1 : users[users.length - 1]._id + 1;

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(rs.generate(12), saltRounds);
            const randomMobile = parseInt(rs.generate({ length: 10, charset: 'numeric' }));

            user = await UserSchemaModel.create({
                _id,
                name: name,
                email,
                password: hashedPassword,
                mobile: randomMobile,
                address: "Not Provided",
                city: "other",
                gender: "other",
                role: "user",
                status: 1, 
                info: new Date()
            });
        } else if (user.status !== 1) {
            user.status = 1;
            await user.save();
        }

        const payload = user.email;
        const key = rs.generate(20);
        const token = jwt.sign(payload, key);

        return res.status(200).json({ status: true, token, info: user });
    } catch (error) {
        return res.status(500).json({ status: false, msg: error.message });
    }
};


// import "../modles/connection.js";
// import UserSchemaModel from "../modles/user.model.js";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import  SendMail from '../mailer_api/mailer.js';

// export const save = async (req, res) => {

//     try {
//         const users = await UserSchemaModel.find();
//         const l = users.length;
//         const _id = l === 0 ? 1 : users[l - 1]._id + 1;
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//         const userDetails = { ...req.body,password: hashedPassword,_id: _id,role: "user", status: 0,info: new Date()};
//         await UserSchemaModel.create(userDetails);
//         //console.log(userDetails)
//         SendMail(req.body.email,req.body.password);
//         res.status(200).json({ status: true });

//     } catch (err) {
//         res.status(500).json({ status: false, error: err.message });
//     }
// };
// export const login = async (req, res) => {
//     try {
//         const email = req.body.email;
//         const password = req.body.password;
//         const user = await UserSchemaModel.findOne({ email: email, status: 1 }).select("+password");
//         if (!user) {
//             return res.status(404).json({status: false,message: "User not found" });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({status: false,message: "Invalid password"});
//         }
//         const token = jwt.sign({id: user._id,email: user.email,role: user.role }, process.env.JWT_SECRET,{ expiresIn: "1d" });
//         user.password = undefined;
//         res.status(200).json({status: true,token: token, info: user });
//     } catch (err) {
//         res.status(500).json({
//             status: false,
//             error: err.message
//         });
//     }
// };

// export const fetch=async(req,res)=>{
//   var condition_obj=req.query;
//   var userList=await UserSchemaModel.find(condition_obj);
//   if(userList.length!=0)
//     res.status(200).json({"status":true,"info":userList});
//   else
//     res.status(404).json({"status":false});
// };


// export var deleteUser=async(req,res)=>{
//   try{
//     let userDetails = await UserSchemaModel.findOne(req.body);
//     if(userDetails){
//       let user=await UserSchemaModel.deleteOne(req.body);
//       if(user)
//         res.status(200).json({"status":true});
//       else
//         res.status(500).json({"status": false});
//     }
//     else
//       res.status(404).json({"status":"Requested resource not available"});
//   }catch(error){
//     res.status(500).json({"status":false});
//   };
// };

// export var update = async (req, res) => {
//     try {
//         let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
//         console.log("User found:", userDetails);
//         if (userDetails) {
//             let user = await UserSchemaModel.updateMany(req.body.condition_obj, { $set: req.body.content_obj });
//             if (user)
//                 res.status(200).json({"status": true});
//             else
//                 res.status(500).json({"status": false});
//         } else
//             res.status(404).json({"status": "Requested resource not available"});
//     } catch(error) {
//         console.log("Error:", error);
//         res.status(500).json({"status": false});
//     };
// };

// /*export var update = async (req, res) => {
//   try {
//     // email ke base pe find kar rahe hain
//     let userDetails = await UserSchemaModel.findOne({ email: req.body.condition_obj.email });
//     console.log("User found:", userDetails);

//     if (userDetails) {
//       let user = await UserSchemaModel.updateMany(
//         { email: req.body.condition_obj.email },
//         { $set: req.body.content_obj }
//       );

//       if (user) res.status(200).json({ status: true });
//       else res.status(500).json({ status: false });
//     } else {
//       res.status(404).json({ status: "Requested resource not available" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: false });
//   }
// };*/
