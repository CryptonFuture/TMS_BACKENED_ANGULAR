import TaskAssign from '../../models/task-assignment/taskAssignModel'
import { Request, Response } from 'express'
import { ITaskAssign } from '../../types/taskAssign.types'
import { FilterQuery } from 'mongoose';


const AddTaskAssign = async (req: Request, res: Response): Promise<Response> => {
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
    }: ITaskAssign = req.body

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

    const taskAssign = new TaskAssign({
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

    const taskAssignData = await taskAssign.save()

    if (taskAssignData) {
        return res.status(200).json({
            success: true,
            message: "Task Assign create successfully",
            data: taskAssignData
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }
}

const getTaskAssign = async (req: Request, res: Response): Promise<Response> => {
    try {
       
        const taskAssign = await TaskAssign.find()
        .populate('user_id')
        .populate('project_id')
        .populate('task_id')

        if (!taskAssign || taskAssign.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: taskAssign,
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        })
    }
}

const editTaskAssignById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const taskAssign = await TaskAssign.findById(id)
    .populate('user_id')
    .populate('project_id')
    .populate('task_id')

    if (!taskAssign) {
        return res.status(404).json({
            success: false,
            error: "No Task Assign Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: taskAssign
    })
}

const viewTaskAssignById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const taskAssign = await TaskAssign.findById(id)
    .populate('user_id')
    .populate('project_id')
    .populate('task_id')

    if (!taskAssign) {
        return res.status(404).json({
            success: false,
            error: "No Task Assign Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: taskAssign
    })
}

// hard deleted
const deleteTaskAssign = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing user ID',
      });
    }

    const taskAssign = await TaskAssign.findById(id);

    if (!taskAssign) {
      return res.status(404).json({
        success: false,
        error: 'No Task Assign found with this ID',
      });
    }

    if (taskAssign.is_deleted !== true) {
        return res.status(400).json({
        success: false,
        error: 'Task Assign cannot be deleted until it is marked as deleted=true',
        });
    }

    await TaskAssign.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Deleted Task Assign successfully',
    });

  

};

// soft deleted
const deleteTaskAssigns = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const taskAssign = await TaskAssign.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!taskAssign) {
        return res.status(404).json({
            success: false,
            error: "No Task Assign Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Task Assign Successfully'
        })
    }
}

const updateTaskAssign = async (req: Request, res: Response): Promise<Response> => {
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
    }: ITaskAssign = req.body;

    if (!user_id || !project_id || !task_id || !plan_hour || !working_hours) {
        return res.status(400).json({
            success: false,
            error: 'fill out all fields'
        })
    }

    const updatedTaskAssign = await TaskAssign.findByIdAndUpdate(
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

    if (!updatedTaskAssign) {
        return res.status(404).json({
            success: false,
            error: 'no record found',
        });
    }


    return res.status(200).json({
        success: true,
        message: "Task Assign updated successfully",
        data: updatedTaskAssign,
    });
}

const taskAssignCount = async (req: Request, res: Response): Promise<Response>  => {
    
    const TaskAssignCount = await TaskAssign.countDocuments()

    return res.status(200).json({
        success: true,
        count: TaskAssignCount
    })
}


export {
   AddTaskAssign,
   updateTaskAssign,
   getTaskAssign,
   editTaskAssignById,
   viewTaskAssignById,
   taskAssignCount,
   deleteTaskAssign,
   deleteTaskAssigns
}