import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const UserSchema = mongoose.Schema({
     _id:Number,
     name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
     },
     email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
     },
    password: {
    type: String,
    required: true,
    select: false
},
mobile:{
  type:Number,
  unique:true,
},
     address:{
        type:String,
        required:true,
     },
     city:{
        type:String,
        required:true,
        lowercase:true,
     },
     gender:{
        type:String,
        required:true,
        lowercase:true,
     },
     
     role:String,
     status:Number,
     info:String,
     recive:String,
})
UserSchema.plugin(mongooseUniqueValidator);
const UserModule = mongoose.model("user",UserSchema);
export default UserModule;