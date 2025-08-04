import User from '../../models/auth/authModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import {Request, Response} from 'express'
import { IUser } from '../../types/user.types'
import mongoose from 'mongoose'

const register = async (req: Request, res: Response): Promise<Response> => {
    const { 
        name, 
        email, 
        password, 
        confirmPass, 
        phone, 
        address, 
        designName, 
        department, 
        joiningDate, 
        description }: IUser = req.body

    if (!name || 
        !email || 
        !password || 
        !confirmPass || 
        !phone || 
        !address || 
        !designName || 
        !department || 
        !joiningDate) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid Email'
        })
    }

    const isExistUser = await User.findOne({ email })

    if (isExistUser) {
        return res.status(400).json({
            success: false,
            error: 'Email already exists has been taken'
        })
    } else if (password !== confirmPass) {
        return res.status(400).json({
            success: false,
            error: "Password does'nt match"
        })
    }

    if (password.length < 10 || confirmPass.length < 10) {
        return res.status(400).json({
            success: false,
            error: 'Password must be at least 10 characters long'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const hashConfirmPass = await bcrypt.hash(confirmPass, 10)

    const user = new User({
        name,
        email,
        password: hashPassword,
        confirmPass: hashConfirmPass,
        phone,
        address,
        designName,
        department,
        joiningDate,
        description
    })

    const userData = await user.save()

    if (userData) {
        return res.status(200).json({
            success: true,
            message: "user create successfully",
            data: userData
        })
    } else {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const login = async (req: Request, res: Response): Promise<Response> => {
    try {

    const { email, password }: { email: string; password: string } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({  success: false, error: 'Invalid credentials' });
    } 

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({  success: false, error: 'Invalid credentials' });
    } 

    if (!user.active) {
        return res.status(400).send({
            success: false,
            error: "This account is in-active, please contact your admin",
        });
    }

     if (!user.is_admin) {
        return res.status(400).send({
            success: false,
            error: "This account is not admin",
        });
    }

    const expiresIn = 24 * 60 * 60 * 1000;
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET_KEY as string, {
      expiresIn: expiresIn
    });

    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString(); 

   return res.json({ 
        success: true,
        accessToken,
        expiresAt,
        user: { 
            id: user._id, 
            email: user.email,
            tokenType: 'Bearer' 
        } ,
        message: 'login Successfully'
    });
  } catch (err) {
   return res.status(500).json({ error: 'Internal server error' });
  }
}

  
const logout = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.query

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, error: "User ID is required for logout." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
        success: false,
        error: 'Invalid User ID.',
        });
    }

    const data = await User.updateOne(
            { _id: id },
            { $set: { accessToken: null } },
        )

    if (data.modifiedCount === 0) {
            return res.status(404).json({ success: false, error: "User not found or already logged out." });
    }

    return res.status(200).json({ success: true, message: "Successfully logged out." });
}


export {
    register,
    login,
    logout
}