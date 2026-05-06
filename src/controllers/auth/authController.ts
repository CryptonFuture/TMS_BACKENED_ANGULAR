import User from '../../models/auth/authModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import {Request, Response} from 'express'
import { IUser } from '../../types/user.types'
import mongoose from 'mongoose'
import Logs from '../../models/logs/logsModel'
// import { redis } from '../../config/redis.config'

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
        description, 
        role 
        }: IUser = req.body

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
        description,
        role
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

const login = async (req: Request, res: Response) => {
    try {

    const { email, password, role }: { email: string; password: string, role: number } = req.body;

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

     if (user.role !== role) {
      return res.status(403).json({
        success: false,
        error: 'Role mismatch. Please select correct role.',
      });
    }

    const expiresIn = 24 * 60 * 60 * 1000;
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET_KEY as string, {
      expiresIn: expiresIn
    });

    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString(); 

    const logs = new Logs({
        user_id: user._id,
        accessToken: accessToken
    })

    await logs.save()

     if (![0, 1, 2, 3, 4].includes(user.role)) {
        return res.status(403).json({
            success: false,
            error: "Unauthorized access: invalid role.",
        });
    }

    if (user.role === 0 || user.role === 1 || user.role === 2 || user.role === 3 || user.role === 4) {
    const users: any = await User.findByIdAndUpdate(
            { _id: user._id },
            { accessToken: accessToken },
            { new: true }
        )

         let message = "Login successfully";
            if (user.role === 0) {
                message = "Admin login successfully";
            } else if (user.role === 1) {
                message = "Employee login successfully";
            } else if (user.role === 2) {
                message = "Client login successfully";
            } else if (user.role === 3) {
                message = "superAdmin login successfully";
            } else if (user.role === 4) {
                message = "subAdmin login successfully";
            }
    
        await users.save()

        // await redis.set(
        //     `token:${user._id}`,
        //     accessToken,
        //     'EX',
        //     60 * 60 * 24
        // );

        return res.json({ 
                success: true,
                accessToken: accessToken,
                expiresAt,
                user: { 
                    id: user._id, 
                    email: user.email,
                    name: user.name,
                    tokenType: 'Bearer',
                    role: user.role 
                } ,
                message: message
            });
    }
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

         await Logs.updateOne(
            { user_id: id },
            { $set: { accessToken: null, logout_time: new Date() } }
        );

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