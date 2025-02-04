import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
export const generateTokenAndSaveInCookies = async (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d"
    })
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    })
    await User.findByIdAndUpdate(id, { token });
    return token;
}
