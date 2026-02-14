import User from "../models/user_model.js";
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookie from '../jwt/generateToken.js'; 
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    // check passwords
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser =await new User({ name, email, password:hashedPassword });
    await newUser.save();
    if(newUser) {
        createTokenAndSaveCookie(newUser._id, res); 
        res.status(201).json({ message: "User created successfully", user:{_id:newUser._id, name: newUser.name, email: newUser.email} });
    }

    

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid User or Password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid User or Password" });
        }
        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({ message: "Login successful", user: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try{
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



export const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.user._id; 
        const filteredUsers = await User.find({_id:{$ne:loggedInUser},}).select('-password -__v');
        res.status(200).json(filteredUsers); 
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}