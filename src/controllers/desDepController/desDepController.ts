import Department from '../../models/department/depModel'
import Designation from '../../models/designation/desModel'
import { Request, Response } from 'express'

const getDesDep = async (req: Request, res: Response) => {
     try {
         const department = await Department.find()
         const designation = await Designation.find()
    
         if (!department || department.length === 0 && !designation || designation.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }
    
        return res.status(200).json({
            success: true,
            data: {
                department,
                designation
            }
        })    
       } catch (error) {
         return res.status(500).json({
          success: false,
          error: 'internal server error',
        });
       }
}

export {
    getDesDep
}