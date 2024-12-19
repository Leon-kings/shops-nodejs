import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const Authorization = async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            token = req.headers.authorization;
        }

        if (!token) {
            return res.status(401).json({ message: 'You are not logged in. Please login to continue.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "Token has expired. Login again.",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
};

export default Authorization;
