import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
const CategorySchema = mongoose.Schema({
    _id:Number,
catnm: {
    type: String,
    required: [true,"Category name is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  // CHANGE: Added name field to match the unique index in the database
  // WHY: The database has a unique index on 'name'. If not provided, it defaults to 'null', causing duplicate key errors.
  name: {
    type: String,
    trim: true
  },
  caticonnm: {
    type: String,
    required: [true,"Category icon name is required"],
    trim: true
  }
})
CategorySchema.plugin(mongooseUniqueValidator);
const CategorySchemaModel = mongoose.model('product_category',CategorySchema);
export default CategorySchemaModel;