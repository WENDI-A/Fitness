import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/index.js";


dotenv.config();

export const registerUser = async (req, res)=>{
  try{
    const {first_name,last_name,email,phone,password} = req.body;

    if (!first_name || !last_name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    };

    const existingUser = await User.findOne({where:{email}});
    if(existingUser){
      return res.status(409).json({message:"Email already registered"});
    };
  


   const hashedPassword = await  bcrypt.hash(password,10);

   const user = await User.create({
    first_name,
    last_name,
    email,
    phone,
    password_hash :hashedPassword,

   });
   res.status(201).json({message:"User registered successfully", user});
  
  } catch(error){
    console.error("Register Error:", error); // Full error in console
    res.status(500).json({ message: error.message, stack: error.stack });
  }
}


//login user

export const loginUser = async(req,res)=>{
  try {
      const{email,password} = req.body;
      if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});

      }
      const user = await User.findOne({where:{email}});
      if (!user) return res.status(404).json({ message: "User not found" });
      const valid = await  bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, user });
  }catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
}

 