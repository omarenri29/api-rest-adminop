import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      immutable: true
    },
    role: {
      type: String,
      default: 'user',
      require: true,
      enum: ['user', 'admin', 'superadmin']
    },
    english_level: {
      type: Number,    
      require: true,
    },
    technical_knowledge: {
      type: String,      
      require: true,
    },
    cv_url: {
      type: String,      
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);
export default User;
