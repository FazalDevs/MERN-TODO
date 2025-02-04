import User from "../models/user.model.js";
import userSchema from "../models/user.model.js";
import { z } from "zod"
import bcrypt from "bcryptjs"
import { generateTokenAndSaveInCookies } from "../jwt/token.js";
const userValidate = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    username: z.string().min(3, { message: "Not long enough" }),
    password: z.string().min(3, { message: "Not Long Enough" })
})
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ errors: "All Fields are required" });
        }
        const validate = await userValidate.safeParse({ username, email, password })
        if (!validate.success) {
            const errorMessages = validate.error.errors.map((err) => err.message)
            return res.status(400).json({ errors: errorMessages });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: "User Already exists" });
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPass })
        await newUser.save();
        if (newUser) {
            const token = await generateTokenAndSaveInCookies(newUser._id, res);
            return res.status(201).json({ message: "user created", newUser, token });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "user cannot be created" });
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({ message: "All fields required" })
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const token = await generateTokenAndSaveInCookies(user._id, res);
        return res.status(200).json({ message: "User logged in", user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Logging In" });
    }
}
export const logoutUser = async (req, res) => {
    try {
        await res.clearCookie("jwt", {
            path: "/",
        })
        return res.status(200).json({ message: "User logged out " });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in logging out!" });
    }
}
export default {}