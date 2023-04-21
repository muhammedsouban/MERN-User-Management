import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const login = async () => {
    try {
        console.log("logged in");
    } catch (error) {
        console.log(error);
    }
}

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash;

    } catch (error) {
        console.log(error.message);
    }
}

export const insertUser = async (req, res) => {
    try {
        const { username, email, mobile, password } = req.body;
        const imageUrl = req.file.filename
        const userData = await User.findOne({ email: req.body.email });
        if (!userData) {
            const secretPassword = await securePassword(password);
            const user = new User({
                username: username,
                email: email,
                mobile: mobile,
                image: imageUrl,
                password: secretPassword,
            });
            const userData = await user.save();
            res.json(userData);
        } else {
            res.json({ message: "Email already taken" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
};


export const Login = async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email })
        const password = req.body.password
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                const token = jwt.sign({ username: userData.username, email: userData.email, id: userData._id }, 'myWebAppSecretKey123', { expiresIn: "180000" })
                res.json({ userData, token })
            } else {
                res.json({ message: 'Email or Password incorrect' })
            }
        } else {
            res.json({ message: 'Email or Password incorrect' })
        }
    } catch (error) {
        console.log(error);
    }
}


export const Profile = async (req, res) => {
    try {
        const email = req.decode.email
        const userData = await User.findOne({ email: email })
        res.json(userData)
    } catch (error) {
        console.log(error);
    }
}

export const UpdateProfile = async (req, res) => {
    try {
        const mail = req.decode.email
        const { username, email, mobile } = req.body
        
        const userData = await User.findOneAndUpdate({ email: mail }, {
            $set: {
                username: username,
                email:email,
                mobile:mobile,
                image:req.file.filename
            }
        })
        res.json(userData)
    } catch (error) {
        console.log(error);
    }
   
}

