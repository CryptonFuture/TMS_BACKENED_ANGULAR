import Project from '../../models/project/projectModel'
import { Request, Response } from 'express'
import { IProject } from '../../types/project.types'
import User from '../../models/auth/authModel'


const AddProject = async (req: Request, res: Response): Promise<Response> => {
    const {
        project_code,
        project_name,
        working_hours,
        joc,
        designName,
        project_manager_id,
        client_id,
        manager_id,
        start_date,
        end_date,
        allow_for_off_time,
        description
    }: IProject = req.body

    if (!project_code || !project_name || !working_hours || !joc || !designName) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

    if (working_hours > 8) {
        return res.status(400).json({
            success: false,
            error: 'Working hours must not exceed 8 hours'
        });
    }

     const isExistProjectCode = await Project.findOne({ project_code })
    
        if (isExistProjectCode) {
            return res.status(400).json({
                success: false,
                error: 'Project Code already exists has been taken'
            })
        }

    const project = new Project({
        project_code,
        project_name,
        working_hours,
        joc,
        designName,
        project_manager_id,
        client_id,
        manager_id,
        start_date,
        end_date,
        allow_for_off_time,
        projectStatus: 'pending',
        status: null,
        description
    })

    const projectData = await project.save()

    if (projectData) {
        return res.status(200).json({
            success: true,
            message: "project create successfully",
            data: projectData
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }
}

const getProject = async (req: Request, res: Response): Promise<Response> => {
    try {

        const project = await Project.find()
        .populate('project_manager_id')
        .populate('manager_id')
        .populate('client_id')

        if (!project || project.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: project,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const getActiveProject = async (req: Request, res: Response): Promise<Response> => {
    try {

        const projectActive = await Project.find({status: true})
        .populate('project_manager_id')
        .populate('manager_id')
        .populate('client_id')

        if (!projectActive || projectActive.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: projectActive,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const getInActiveProject = async (req: Request, res: Response): Promise<Response> => {
    try {

        const projectInActive = await Project.find({status: false})
        .populate('project_manager_id')
        .populate('manager_id')
        .populate('client_id')

        if (!projectInActive || projectInActive.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: projectInActive,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const getPendingProject = async (req: Request, res: Response): Promise<Response> => {
    try {

        const projectPending = await Project.find({projectStatus: 'pending'})
        .populate('project_manager_id')
        .populate('manager_id')
        .populate('client_id')

        if (!projectPending || projectPending.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: projectPending,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const getCompletedProject = async (req: Request, res: Response): Promise<Response> => {
    try {

        const projectCompleted = await Project.find({projectStatus: 'completed'})
        .populate('project_manager_id')
        .populate('manager_id')
        .populate('client_id')

        if (!projectCompleted || projectCompleted.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: projectCompleted,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const getRejectProject = async (req: Request, res: Response): Promise<Response> => {
    try {

        const projectReject = await Project.find({projectStatus: 'reject'})
        .populate('project_manager_id')
        .populate('manager_id')
        .populate('client_id')

        if (!projectReject || projectReject.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: projectReject,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const approvalCompletedRemarks = async (req: Request, res: Response): Promise<Response>  => {
    const { id } = req.params
    const { remarks } = req.body

    if (!remarks) {
        return res.status(400).json({
            success: false,
            error: 'remarks is required'
        })
    }

    const project = await Project.findByIdAndUpdate(
        { _id: id },
        {
            remarks,
            projectStatus: "completed"
        },
        { new: true }
    )
       

     if (project) {
        return res.status(200).json({
            success: true,
            message: "project completed successfully",
            data: project
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }

}

const approvalRejectedRemarks = async (req: Request, res: Response): Promise<Response>  => {
    const { id } = req.params
    const { remarks } = req.body

    if (!remarks) {
        return res.status(400).json({
            success: false,
            error: 'remarks is required'
        })
    }

    const project = await Project.findByIdAndUpdate(
        { _id: id },
        {
            remarks,
            projectStatus: "reject"
        },
        { new: true }
    )
       

     if (project) {
        return res.status(200).json({
            success: true,
            message: "project rejected successfully",
            data: project
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }

}

const editProjectById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'ID parameter is missing',
        });
    }

    const project = await Project.findById(id)
    .populate('project_manager_id')
    .populate('manager_id')
    .populate('client_id')

    if (!project) {
        return res.status(404).json({
            success: false,
            error: "No project Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: project
    })
}

const viewProjectById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'ID parameter is missing',
        });
    }

    const project = await Project.findById(id)

    if (!project) {
        return res.status(404).json({
            success: false,
            error: "No project Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: project
    })
}

// hard deleted
const deleteProject = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!id || id.length !== 24) {
        return res.status(400).json({
            success: false,
            error: 'Invalid or missing project ID',
        });
    }

    const project = await Project.findById(id);

    if (!project) {
        return res.status(404).json({
            success: false,
            error: 'No project found with this ID',
        });
    }

    if (project.is_deleted !== true) {
        return res.status(400).json({
            success: false,
            error: 'Project cannot be deleted until it is marked as deleted=true',
        });
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: 'Deleted project successfully',
    });



};

// soft deleted
const deleteProjects = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const project = await Project.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!project) {
        return res.status(404).json({
            success: false,
            error: "No project Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete project Successfully'
        })
    }
}

const updateProject = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const {
        project_code,
        project_name,
        working_hours,
        joc,
        designName,
        project_manager_id,
        client_id,
        manager_id,
        start_date,
        end_date,
        allow_for_off_time,
        description,
        projectStatus,
        status
    }: IProject = req.body;

    if (!project_code || !project_name || !working_hours || !joc || !designName) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

    const updatedProject = await Project.findByIdAndUpdate(
        { _id: id },
        {
            project_code,
            project_name,
            working_hours,
            joc,
            designName,
            project_manager_id,
            client_id,
            manager_id,
            start_date,
            end_date,
            allow_for_off_time,
            description,
            projectStatus,
            status
        },
        { new: true }
    );

    if (!updatedProject) {
        return res.status(404).json({
            success: false,
            error: 'no record found',
        });
    }


    return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: updatedProject,
    });
}

const projectCount = async (req: Request, res: Response): Promise<Response> => {

    const projcount = await Project.countDocuments()

    return res.status(200).json({
        success: true,
        count: projcount
    })
}

const projectActiveCount = async (req: Request, res: Response): Promise<Response> => {

    const projActivecount = await Project.countDocuments({status: true})

    return res.status(200).json({
        success: true,
        count: projActivecount
    })
}

const projectInActiveCount = async (req: Request, res: Response): Promise<Response> => {

    const projInActivecount = await Project.countDocuments({status: false})

    return res.status(200).json({
        success: true,
        count: projInActivecount
    })
}

const projectCompletedCount = async (req: Request, res: Response): Promise<Response> => {

    const projCompletedCount = await Project.countDocuments({projectStatus: 'completed'})

    return res.status(200).json({
        success: true,
        count: projCompletedCount
    })
}

const projectPendingCount = async (req: Request, res: Response): Promise<Response> => {

    const projPendingCount = await Project.countDocuments({projectStatus: 'pending'})

    return res.status(200).json({
        success: true,
        count: projPendingCount
    })
}

const projectRejectCount = async (req: Request, res: Response): Promise<Response> => {

    const projRejectCount = await Project.countDocuments({projectStatus: 'reject'})

    return res.status(200).json({
        success: true,
        count: projRejectCount
    })
}



const toggleIsAllow = async (req: Request, res: Response) => {
    const { id, allow_for_off_time } = req.body

    if(!id) {
        return res.status(400).json({ success: false, error: 'ID is required' });
    }

    try {
     const proj = await Project.findByIdAndUpdate(
        id,
        {allow_for_off_time: allow_for_off_time},
        {new: true}
    )

    if (!proj) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

     const message = proj.allow_for_off_time
        ? 'Off time is allowed for this project.'
        : 'Off time is not allowed for this project.';

    return res.status(200).json({ success: true, message, data: proj }); 
       
    } catch (error) {
            return res.status(500).json({ success: false, error: 'Server error' });

    }
   
}

const activeProject = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const user = await Project.findByIdAndUpdate({ _id: id }, { status: true })

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "No project Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Project Active Successfully'
        })
    }
}

const InactiveProject = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const user = await Project.findByIdAndUpdate({ _id: id }, { status: false })

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "No project Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Project InActive Successfully'
        })
    }
}

export {
    AddProject,
    getProject,
    getActiveProject,
    getInActiveProject,
    getCompletedProject,
    getPendingProject,
    getRejectProject,
    editProjectById,
    viewProjectById,
    updateProject,
    deleteProject,
    deleteProjects,
    projectCount,
    projectActiveCount,
    projectInActiveCount,
    projectCompletedCount,
    projectPendingCount,
    projectRejectCount,
    toggleIsAllow,
    approvalCompletedRemarks,
    approvalRejectedRemarks,
    activeProject,
    InactiveProject
}