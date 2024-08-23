import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true },
    description: mongoose.Schema.Types.String,
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now }
});

export const Categories = mongoose.model('Categories', categorySchema);
