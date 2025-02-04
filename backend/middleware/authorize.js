import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ errors: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded.id)
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ errors: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "" + error.message })
    }
    next();
}
export default {}