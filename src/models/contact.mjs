import mongoose, { Types } from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String,required: true,trim: true,},
  email: { type: String,required: true,trim: true,match: [/\S+@\S+\.\S+/, 'is invalid'],  },
  message: { type: String,required: true,},
  submittedAt: { type: Date,default: Date.now, },
});


export const Contact = mongoose.model("Contact",ContactSchema);