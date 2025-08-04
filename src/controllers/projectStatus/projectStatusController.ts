import ProjectStatus from '../../models/projectStatus/projectStatusModel'
import { Request, Response } from 'express'

const getProjectStatus = async (req: Request, res: Response): Promise<Response> => {
    try {

        const projectStatus = await ProjectStatus.find()

        if (!projectStatus || projectStatus.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: projectStatus,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

export {
    getProjectStatus
}