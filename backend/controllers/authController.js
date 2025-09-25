const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { firstName, lastName, email, password, role } = req.body;

    try {
        let existing = await Admin.findOne({ email });
        if (existing) return res.status(409).json({ msg: "Email already registered" });

        const hashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        const admin = new Admin({ firstName, lastName, email, password: hashed, role });
        await admin.save();

        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({ msg: "Admin registered", token });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email }).select("+password");
        if (!admin) return res.status(401).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ msg: "Login successful", token });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

const changePassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ msg: "No admin found with this email" });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12
        );

        admin.password = hashedPassword;
        await admin.save();

        res.json({ msg: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { register, login, changePassword };