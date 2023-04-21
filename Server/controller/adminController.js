import Admin from "../models/adminModel.js";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

export const adminLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email })
        if (admin) {
            const isPasswordValid = admin.password;
            if (isPasswordValid) {
                const adminToken = jwt.sign({ email: admin.email }, 'myWebAppSecretKey123', { expiresIn: "180000" })
                return res.status(200).json({ message: "Login Sucess", adminToken, admin: admin.email });
            } else {
                return res.status(403).json({ message: "Wrong password" });
            }
        } else {
            return res.status(500).json({ message: "Wrong Email " });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
    }
}


export const getUsers = async (req, res) => {
    try {
        const adminData = await User.find().lean()
        res.json(adminData)
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const adminData = await User.findByIdAndDelete({ _id: req.params.id })
        res.json(adminData)
    } catch (error) {
        console.log(error);
    }
}

export const editUser = async (req, res) => {
    try {

        const userData = await User.findById({ _id: req.params.id })
        res.json(userData)
    } catch (error) {
        console.log(error);
    }
}

export const UpdateUser = async (req, res) => {
    try {

        const { username, email, mobile } = req.body
        const userData = await User.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                username: username,
                email: email,
                mobile: mobile,
                image: req.file.filename
            }
        })
        res.json(userData)
    } catch (error) {
        console.log(error);
    }

}