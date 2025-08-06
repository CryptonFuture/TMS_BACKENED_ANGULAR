import AssignEmpToClient from '../../models/assign-emp-to-client/assignEmpToClientModel'
import { Request, Response } from 'express'

const addAssignEmployeeToClient = async (req: Request, res: Response): Promise<Response> => {
    const {emp_id, client_id, proj_id, description} = req.body

    if(!emp_id) {
         return res.status(400).json({
            success: false,
            error: 'employee id is required'
        })
    }

    const assignEmp = new AssignEmpToClient({
        emp_id,
        client_id,
        proj_id,
        description
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

const getAssignEmp = async (req: Request, res: Response): Promise<Response> => {
   try {
     const user = await AssignEmpToClient.find({status: true})
     .populate('emp_id')
     .populate('proj_id')
     .populate('client_id')

     if (!user || user.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user,
      
    })    
   } catch (error) {
     return res.status(500).json({
      success: false,
      error: 'internal server error',
    });
   }
}

const getUnAssignEmp = async (req: Request, res: Response): Promise<Response> => {
   try {
     const user = await AssignEmpToClient.find({status: false})
     .populate('emp_id')
     .populate('proj_id')
     .populate('client_id')

     if (!user || user.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user,
      
    })    
   } catch (error) {
     return res.status(500).json({
      success: false,
      error: 'internal server error',
    });
   }
}

const assignEmpCount = async (req: Request, res: Response): Promise<Response>  => {

    const empAssignCount = await AssignEmpToClient.countDocuments({status: true})

    return res.status(200).json({
        success: true,
        count: empAssignCount
    })
}

const unAssignEmpCount = async (req: Request, res: Response): Promise<Response>  => {

    const empUnAssignCount = await AssignEmpToClient.countDocuments({status: false})

    return res.status(200).json({
        success: true,
        count: empUnAssignCount
    })
}

// hard deleted
const deleteAllocationEmp = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing user ID',
      });
    }

    const AllocEmp = await AssignEmpToClient.findById(id);

    if (!AllocEmp) {
      return res.status(404).json({
        success: false,
        error: 'No allocEmp found with this ID',
      });
    }

    await AssignEmpToClient.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Deleted Alloc Emp successfully',
    });

};

// soft deleted
const deleteAllocEmp = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const AllocEmp = await AssignEmpToClient.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!AllocEmp) {
        return res.status(404).json({
            success: false,
            error: "No user Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Alloc Emp Successfully'
        })
    }
}

const updateAllocEmp = async (req: Request, res: Response) => {
    const { id } = req.params

    const { emp_id, client_id, proj_id, description, status } = req.body;

    if (!emp_id || !client_id) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields',
        });
    }

    const updatedAllocEmp = await AssignEmpToClient.findByIdAndUpdate(
        { _id: id },
        {
            emp_id,
            client_id,
            proj_id,
            description,
            status
        },
        { new: true }
    );

    if (!updatedAllocEmp) {
        return res.status(404).json({
            success: false,
            error: 'no record found',
        });
    }


    return res.status(200).json({
        success: true,
        message: "Alloc Emp updated successfully",
        data: updatedAllocEmp,
    });
}

const editAllocEmpById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const AllocEmp = await AssignEmpToClient.findById(id)

    if (!AllocEmp) {
        return res.status(404).json({
            success: false,
            error: "No Alloc Emp Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: AllocEmp
    })
}

const viewAllocEmpById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const AllocEmp = await AssignEmpToClient.findById(id)

    if (!AllocEmp) {
        return res.status(404).json({
            success: false,
            error: "No Alloc Emp Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: AllocEmp
    })
}

export {
    addAssignEmployeeToClient,
    getAssignEmp,
    getUnAssignEmp,
    assignEmpCount,
    unAssignEmpCount,
    deleteAllocEmp,
    deleteAllocationEmp,
    updateAllocEmp,
    editAllocEmpById,
    viewAllocEmpById
    
}
