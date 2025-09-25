const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "superadmin", "staff"], default: "admin" },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Admin", AdminSchema);