import EmpAssign from '../../models/employee-assignment/employeeAssignmentModel'
import { Request, Response } from 'express'
import { IEmpAssign } from '../../types/empAssign.types'
import { FilterQuery } from 'mongoose';


interface QueryParams {
  search?: string;
  status?: string;
  date?: string;
  page?: any,
  limit?: any,
  sort?: any
}


const AddEmpAssign = async (req: Request, res: Response): Promise<Response> => {
    const {
        user_id, 
        project_id, 
        plan_start_date, 
        plan_end_date, 
        task_id, 
        plan_hour, 
        working_hours ,
        start_date,
        end_date,
        description
    }: IEmpAssign = req.body

    if (!user_id || !project_id || !task_id || !plan_hour || !working_hours) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

    if (plan_hour > 5) {
        return res.status(400).json({
            success: false,
            error: 'Plan hours must not exceed 5 hours'
        });
    }

    if (working_hours > 8) {
        return res.status(400).json({
            success: false,
            error: 'Working hours must not exceed 8 hours'
        });
    }

    if (plan_start_date && plan_end_date && new Date(plan_start_date) > new Date(plan_end_date)) {
        return res.status(400).json({
            success: false,
            error: 'Plan Start date must not be greater than plan end date'
        });
    }

    if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
        return res.status(400).json({
            success: false,
            error: 'Start date must not be greater than end date'
        });
    }

    const empAssign = new EmpAssign({
        user_id, 
        project_id, 
        plan_start_date, 
        plan_end_date, 
        task_id, 
        plan_hour, 
        working_hours ,
        start_date,
        end_date,
        description
    })

    const empAssignData = await empAssign.save()

    if (empAssignData) {
        return res.status(200).json({
            success: true,
            message: "Emp Assign create successfully",
            data: empAssignData
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }
}

const getEmpAssign = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> => {
     const {page = 1, limit = 10, search = "", sort = "", status, date } = req.query;
        
          const pageNumber = parseInt(page, 10);
          const limitNumber = parseInt(limit, 10);
        
          const searchQuery: FilterQuery<typeof EmpAssign> = {};
        
          if (search) {
            searchQuery.$or = [
              { description: { $regex: search, $options: "i" } }
            ];
          }
        
          if (status) {
            searchQuery.status = status === 'true';
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
       
        const empAssign = await EmpAssign.find(searchQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber)
        .populate('user_id')
        .populate('project_id')
        .populate('task_id')

        if (!empAssign || empAssign.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: empAssign,
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        })
    }
}

const editEmpAssignyId = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const empAssign = await EmpAssign.findById(id)
    .populate('user_id')
    .populate('project_id')
    .populate('task_id')

    if (!empAssign) {
        return res.status(404).json({
            success: false,
            error: "No Emp Assign Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: empAssign
    })
}

const viewEmpAssignById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const empAssign = await EmpAssign.findById(id)
    .populate('user_id')
    .populate('project_id')
    .populate('task_id')

    if (!empAssign) {
        return res.status(404).json({
            success: false,
            error: "No Emp Assign Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: empAssign
    })
}

// hard deleted
const deleteEmpAssign = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing user ID',
      });
    }

    const empAssign = await EmpAssign.findById(id);

    if (!empAssign) {
      return res.status(404).json({
        success: false,
        error: 'No Emp Assign found with this ID',
      });
    }

    if (empAssign.is_deleted !== true) {
        return res.status(400).json({
        success: false,
        error: 'Emp Assign cannot be deleted until it is marked as deleted=true',
        });
    }

    await EmpAssign.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Deleted Emp Assign successfully',
    });

  

};

// soft deleted
const deleteEmpAssigns = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const empAssign = await EmpAssign.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!empAssign) {
        return res.status(404).json({
            success: false,
            error: "No Emp Assign Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Emp Assign Successfully'
        })
    }
}

const updateEmpAssign = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const {   
        user_id, 
        project_id, 
        plan_start_date, 
        plan_end_date, 
        task_id, 
        plan_hour, 
        working_hours ,
        start_date,
        end_date,
        description, 
        status 
    }: IEmpAssign = req.body;

    if (!user_id || !project_id || !task_id || !plan_hour || !working_hours) {
        return res.status(400).json({
            success: false,
            error: 'fill out all fields'
        })
    }

    const updatedEmpAssign = await EmpAssign.findByIdAndUpdate(
        { _id: id },
        {
            user_id, 
            project_id, 
            plan_start_date, 
            plan_end_date, 
            task_id, 
            plan_hour, 
            working_hours ,
            start_date,
            end_date,
            description, 
            status 
        },
        { new: true }
    );

    if (!updatedEmpAssign) {
        return res.status(404).json({
            success: false,
            error: 'no record found',
        });
    }


    return res.status(200).json({
        success: true,
        message: "Emp Assign updated successfully",
        data: updatedEmpAssign,
    });
}

const empAssignCount = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response>  => {
    
      const { search = "", status, date } = req.query;
        
          const searchQuery: FilterQuery<typeof EmpAssign> = {};
        
          if (search) {
            searchQuery.$or = [
              { description: { $regex: search, $options: "i" } }
            ];
          }
        
          if (status) {
            searchQuery.status = status === 'true';
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

    const EmpAssignCount = await EmpAssign.countDocuments(searchQuery)

    return res.status(200).json({
        success: true,
        count: EmpAssignCount
    })
}


export {
   AddEmpAssign,
   updateEmpAssign,
   getEmpAssign,
   editEmpAssignyId,
   viewEmpAssignById,
   empAssignCount,
   deleteEmpAssign,
   deleteEmpAssigns
}