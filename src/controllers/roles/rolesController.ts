import Roles from '../../models/roles/rolesModel'
import { Request, Response } from 'express'

const getRoles = async (req: Request, res: Response): Promise<Response> => {

    const userRole = await Roles.find()

    if (userRole.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    return res.status(200).json({
        success: true,
        data: userRole,
    });
};

export {
    getRoles,
}