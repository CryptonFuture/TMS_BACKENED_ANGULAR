import Task from '../../models/task/taskModel'
import { Request, Response } from 'express'
import { ITask } from '../../types/task.types'

const AddTask = async (req: Request, res: Response): Promise<Response> => {
    const { name, client_id, description }: any = req.body

    if (!name) {
        return res.status(400).json({
            success: false,
            error: 'Name is Required'
        })
    }

    const task = new Task({
        name,
        client_id,
        description
    })

    const taskData = await task.save()

    if (taskData) {
        return res.status(200).json({
            success: true,
            message: "task create successfully",
            data: taskData
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }
}

const getTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const task = await Task.find()

        if (!task || task.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const editTaskById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({
            success: false,
            error: "No task Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: task
    })
}

const viewTaskById = async (req: Request, res: Response): Promise<Response> => {
   const { id } = req.params

   if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID parameter is missing',
      });
    }

    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({
            success: false,
            error: "No task Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: task
    })
}

// hard deleted
const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing user ID',
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'No task found with this ID',
      });
    }

    if (task.is_deleted !== true) {
        return res.status(400).json({
        success: false,
        error: 'Task cannot be deleted until it is marked as deleted=true',
        });
    }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Deleted task successfully',
    });

  

};

// soft deleted
const deleteTasks = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const task = await Task.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!task) {
        return res.status(404).json({
            success: false,
            error: "No task Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete task Successfully'
        })
    }
}

const updateTask = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const { name, client_id, description, status }: ITask = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            error: 'Name is Required',
        });
    }

    const updatedUser = await Task.findByIdAndUpdate(
        { _id: id },
        {
           name, 
           client_id, 
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
        message: "User updated successfully",
        data: updatedUser,
    });
}


export {
    getTask,
    AddTask,
    editTaskById,
    viewTaskById,
    deleteTask,
    deleteTasks,
    updateTask
}