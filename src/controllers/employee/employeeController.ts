import validator from 'validator';
import User from '../../models/auth/authModel'
import { Request, Response } from 'express'
import { FilterQuery } from 'mongoose'

interface QueryParams {
  search?: string;
  active?: string;
  date?: string;
  page?: any,
  limit?: any,
  sort?: any
}

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

const getActiveEmp = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> => {

  const {page = 1, limit = 10, search = "", sort = "", active, date } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const searchQuery: FilterQuery<typeof User> = { active: true };

  if (search) {
    searchQuery.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } }
    ];
  }

  if (active) {
    searchQuery.active = active === 'true';
  }

  if (date) {
    const selectedDate = new Date(date);
    const nextDate = new Date(date);
    nextDate.setDate(selectedDate.getDate() + 1);

    searchQuery.createdAt = {
      $gte: selectedDate,
      $lt: nextDate
    };

  }

   try {
     const skip = (pageNumber - 1) * limitNumber;

      let sortOptions: any = {};
      if (sort) {
          const [field, order] = sort.split(":");
          sortOptions[field] = order === "desc" ? -1 : 1;
      }

     const user = await User.find(searchQuery)
     .sort(sortOptions)
     .skip(skip)
     .limit(limitNumber)

     const totalRecords = await User.countDocuments(searchQuery);

     if (!user || user.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user,
        pagination: {
          totalRecords,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalRecords / limitNumber),
          limit: limitNumber
        }
    })    
   } catch (error) {
     return res.status(500).json({
      success: false,
      error: 'internal server error',
    });
   }
}

const getInActiveEmp = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> => {
  const { page = 1, limit = 10, search = "", active, date } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const searchQuery: FilterQuery<typeof User> = { active: false };

  if (search) {
    searchQuery.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } }
    ];
  }

  if (active) {
    searchQuery.active = active === 'true';
  }

  if (date) {
    const selectedDate = new Date(date);
    const nextDate = new Date(date);
    nextDate.setDate(selectedDate.getDate() + 1);

    searchQuery.createdAt = {
      $gte: selectedDate,
      $lt: nextDate
    };
  }

   try {
     const skip = (pageNumber - 1) * limitNumber;

     const user = await User.find(searchQuery)
     .skip(skip)
     .limit(limitNumber)

     const totalRecords = await User.countDocuments(searchQuery);

     if (!user || user.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user,
        pagination: {
          totalRecords,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalRecords / limitNumber),
          limit: limitNumber
        }
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

    const emp = await User.findById(id);

    if (!emp) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

     if (active === true && emp.is_deleted === false) {
      return res.status(403).json({
        success: false,
        error: 'Cannot activate a deleted employee account'
      });
    }

    const updatedUser  = await User.findByIdAndUpdate(
        id,
        {active: active},
        {new: true}
    )

    const statusMsg = active ? 'Employee is now Active.' : 'Employee is now Inactive.';


    res.status(200).json({ success: true, message: statusMsg, data: updatedUser  });
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

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params

    const { phone, address, designName, department, description, active, is_admin } = req.body;

    if (!phone || !address || !designName || !department) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields',
        });
    }

    const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
            phone,
            address,
            designName,
            department,
            description,
            active,
            is_admin
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
        message: "User updated successfully",
        data: updatedUser,
    });
}

const employeeAllCount = async (req: Request, res: Response): Promise<Response>  => {

    const empAllcount = await User.countDocuments()

    return res.status(200).json({
        success: true,
        count: empAllcount
    })
}

const employeeActiveCount = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response>  => {

   const { search = "", active, date } = req.query;

  const searchQuery: FilterQuery<typeof User> = {active: true};

  if (search) {
    searchQuery.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } }
    ];
  }

  if (active) {
    searchQuery.active = active === 'true';
  }

  if (date) {
    const selectedDate = new Date(date);
    const nextDate = new Date(date);
    nextDate.setDate(selectedDate.getDate() + 1);

    searchQuery.createdAt = {
      $gte: selectedDate,
      $lt: nextDate
    };
  }
   
    const empActiveCount = await User.countDocuments(searchQuery)

    return res.status(200).json({
        success: true,
        count: empActiveCount
    })
}

const employeeInActiveCount = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response>  => {

  const { search = "", active, date } = req.query;

  const searchQuery: FilterQuery<typeof User> = {active: false};

  if (search) {
    searchQuery.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } }
    ];
  }

  if (active) {
    searchQuery.active = active === 'true';
  }

  if (date) {
    const selectedDate = new Date(date);
    const nextDate = new Date(date);
    nextDate.setDate(selectedDate.getDate() + 1);

    searchQuery.createdAt = {
      $gte: selectedDate,
      $lt: nextDate
    };
  }
   
    const empInActiveCount = await User.countDocuments(searchQuery)

    return res.status(200).json({
        success: true,
        count: empInActiveCount
    })
}

export {
    getActiveEmp,
    employeeAllCount,
    employeeActiveCount,
    employeeInActiveCount,
    getInActiveEmp,
    editEmpById,
    toggleStatus,
    toggleAdmin,
    deleteEmp,
    deleteUsers,
    viewEmpById,
    updateUser
}