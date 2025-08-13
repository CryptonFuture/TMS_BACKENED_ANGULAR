import Route from '../../models/route/routeModel'
import { Request, Response } from 'express'

const getRoutes = async (req: Request, res: Response): Promise<Response> => {

    const userRoute = await Route.find()

    if (userRoute.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    return res.status(200).json({
        success: true,
        data: userRoute,
    });
};

export {
    getRoutes,
}