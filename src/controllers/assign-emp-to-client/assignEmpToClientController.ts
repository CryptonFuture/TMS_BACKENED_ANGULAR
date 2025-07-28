import AssignEmpToClient from '../../models/assign-emp-to-client/assignEmpToClientModel'
import { Request, Response } from 'express'

const addAssignEmployeeToClient = async (req: Request, res: Response): Promise<Response> => {
    const {emp_id, client_id} = req.body

    if(!emp_id) {
         return res.status(400).json({
            success: false,
            error: 'employee id is required'
        })
    }

    const assignEmp = new AssignEmpToClient({
        emp_id,
        client_id
    })

    const assignEmpToClient = await assignEmp.save()

    if(assignEmpToClient) {
        return res.status(200).json({
            success: true,
            message: "Assign Emp To Client Create Successfully",
            data: assignEmpToClient
        })
    } else {
         return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export {
    addAssignEmployeeToClient
}
