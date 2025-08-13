import Permission from '../../models/permission/permissionModel'
import { Request, Response } from 'express'
import { IPermission } from '../../types/permission.types'


const AddPermission = async (req: Request, res: Response) => {
    const { name, route, role, action, description }: IPermission = req.body

    try {
     
    const permission = new Permission({
        name, 
        route, 
        role, 
        action,
        description
    })

    const permissionDate = await permission.save()

    if (permissionDate) {
        return res.status(200).json({
            success: true,
            message: "permission create successfully",
            data: permissionDate
        })
    }
    } catch (error) {
        console.log(error, 'error');
        
         return res.status(500).json({
            success: false,
            error: "Internal server error",
        })

        
    }

     
}

const getPermission = async (req: Request, res: Response): Promise<Response> => {
      
    try {
        const permission = await Permission.find()

        if (!permission || permission.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: permission,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const editPermissionById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const permission = await Permission.findById(id)
    

    if (!permission) {
        return res.status(404).json({
            success: false,
            error: "No permission Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: permission
    })
}

const viewPermissionById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const permission = await Permission.findById(id)

    if (!permission) {
        return res.status(404).json({
            success: false,
            error: "No permission Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: permission
    })
}

// hard deleted
const deletePermission = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing user ID',
      });
    }

    const permission = await Permission.findById(id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        error: 'No permission found with this ID',
      });
    }

    if (permission.is_deleted !== true) {
        return res.status(400).json({
        success: false,
        error: 'Permission cannot be deleted until it is marked as deleted=true',
        });
    }

    await Permission.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Deleted Permission successfully',
    });

  

};

// soft deleted
const deletePermissions = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const permission = await Permission.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!permission) {
        return res.status(404).json({
            success: false,
            error: "No permission Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Permission Successfully'
        })
    }
}

const updatePermission = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const {  name, route, role, action, description, status }: IPermission = req.body;

    const updatedUser = await Permission.findByIdAndUpdate(
        { _id: id },
        {
            name, 
            route, 
            role, 
            action,
            description, 
            status
        },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            error: 'no record found',
        });
    }


    return res.status(200).json({
        success: true,
        message: "Permission updated successfully",
        data: updatedUser,
    });
}

const permissionCount = async (req: Request, res: Response): Promise<Response>  => {
    
    const taskcount = await Permission.countDocuments()

    return res.status(200).json({
        success: true,
        count: taskcount
    })
}


export {
    getPermission,
    AddPermission,
    editPermissionById,
    viewPermissionById,
    deletePermission,
    deletePermissions,
    updatePermission,
    permissionCount
}