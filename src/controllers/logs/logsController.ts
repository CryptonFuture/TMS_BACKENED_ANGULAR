import Logs from '../../models/logs/logsModel'
import { Request, Response } from 'express'

const getLogs = async (req: Request, res: Response): Promise<Response> => {
    
    const userLogs = await Logs.find()
    .populate('user_id')

    if (userLogs.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    return res.status(200).json({
        success: true,
        data: userLogs,
    });
};

const logsCount = async (req: Request, res: Response): Promise<Response>  => {
    
    const logscount = await Logs.countDocuments()

    return res.status(200).json({
        success: true,
        count: logscount
    })
}


export {
    getLogs,
    logsCount
}