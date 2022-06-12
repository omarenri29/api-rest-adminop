import mongoose from "mongoose";

const rolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    title: {
      type: String,
      require: true,
      trim: true,
    },
    permissions: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Rol = mongoose.model("Rol", rolSchema);
export default Rol;
