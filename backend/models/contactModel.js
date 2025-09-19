import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  phone: {type: String},
})

const contactModel = mongoose.models.user || mongoose.model("contact", contactSchema)

export default contactModel