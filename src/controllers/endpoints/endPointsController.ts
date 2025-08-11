import Ep from '../../models/endpoints/endPointsModel'
import { Request, Response } from 'express'

const getEp = async (req: Request, res: Response): Promise<Response> => {
    
    const eP = await Ep.find()

    if (eP.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    return res.status(200).json({
        success: true,
        data: eP,
    });
};

const EpCount = async (req: Request, res: Response): Promise<Response>  => {
    
    const epcount = await Ep.countDocuments()

    return res.status(200).json({
        success: true,
        count: epcount
    })
}


export {
    getEp,
    EpCount
}