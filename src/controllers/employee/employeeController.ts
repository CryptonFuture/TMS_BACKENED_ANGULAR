import User from '../../models/auth/authModel'
import { Request, Response } from 'express'

const getActiveEmp = async (req: Request, res: Response): Promise<Response> => {
   try {
     const user = await User.find({active: true})

     if (!user || user.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user
    })    
   } catch (error) {
     return res.status(500).json({
      success: false,
      error: 'internal server error',
    });
   }
}

const getInActiveEmp = async (req: Request, res: Response): Promise<Response> => {
   try {
     const user = await User.find({active: false})

     if (!user || user.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user
    })    
   } catch (error) {
     return res.status(500).json({
      success: false,
      error: 'internal server error',
    });
   }
}

export {
    getActiveEmp,
    getInActiveEmp
}