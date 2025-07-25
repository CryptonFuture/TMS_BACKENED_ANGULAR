import User from '../../models/auth/authModel'
import { Request, Response } from 'express'

const editEmpById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "No user Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user
    })
}

const viewEmpById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "No user Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user
    })
}

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

const toggleStatus = async (req: Request, res: Response) => {
    const {id, active} = req.body

    if(!id) {
        return res.status(400).json({ success: false, error: 'ID is required' });
    }

    const emp = await User.findByIdAndUpdate(
        id,
        {active: active},
        {new: true}
    )

    if (!emp) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

    res.status(200).json({ success: true, message: 'Employee is now Active.', data: emp });
}

const toggleAdmin = async (req: Request, res: Response) => {
    const {id, is_admin} = req.body

    if(!id) {
        return res.status(400).json({ success: false, error: 'ID is required' });
    }

    try {
     const emp = await User.findByIdAndUpdate(
        id,
        {is_admin: is_admin},
        {new: true}
    )

    if (!emp) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

     const message = emp.is_admin
      ? 'Admin status updated. Employee is now an Admin.'
      : 'Admin status updated. Employee is no longer an Admin.';

    return res.status(200).json({ success: true, message, data: emp }); 
       
    } catch (error) {
            return res.status(500).json({ success: false, error: 'Server error' });

    }
   
}

// hard deleted
const deleteEmp = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing user ID',
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No user found with this ID',
      });
    }

    if (user.status === true || user.active === true) {
      return res.status(400).json({
        success: false,
        error: 'Active users cannot be deleted',
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Deleted user successfully',
    });

  

};

// soft deleted
const deleteUsers = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "No user Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete User Successfully'
        })
    }
}

export {
    getActiveEmp,
    getInActiveEmp,
    editEmpById,
    toggleStatus,
    toggleAdmin,
    deleteEmp,
    deleteUsers,
    viewEmpById
}