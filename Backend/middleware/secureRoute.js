import jwt from 'jsonwebtoken';
import User from '../models/user_model.js';

const secureRoute = async (req, res, next) => {
    try{
        const tokener=req.cookies.token;
        if(!tokener){
            return res.status(401).json({message: 'Unauthorized: No token provided'});
        }
        const verified=jwt.verify(tokener, process.env.JWT_TOKEN);
        if(!verified){
            return res.status(401).json({message: 'Unauthorized: Invalid token'});
        }
        const user=await User.findById(verified.id).select('-password'); // <-- FIXED HERE
        if(!user){
            return res.status(401).json({message: 'Unauthorized: User not found'});
        }
        req.user=user;
        next();
    }catch(err){
        console.log('Error in secureRoute middleware:', err);
        return res.status(401).json({message: 'Internal server error'});
    }
}
export default secureRoute;