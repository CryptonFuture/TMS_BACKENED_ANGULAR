import express from "express"
import { 
    AddProject, 
    getActiveProject, 
    getInActiveProject, 
    getCompletedProject, 
    getPendingProject, 
    getRejectProject, 
    getProject, 
    toggleIsAllow, 
    editProjectById, 
    viewProjectById, 
    deleteProject, 
    deleteProjects, 
    updateProject, 
    projectCount ,
    approvalCompletedRemarks,
    approvalRejectedRemarks,
    InactiveProject,
    activeProject,
    projectActiveCount,
    projectInActiveCount,
    projectCompletedCount,
    projectPendingCount,
    projectRejectCount
} from '../../controllers/project/projectController'

const router = express.Router()

router.post('/AddProject', AddProject)
router.get('/getProject', getProject)
router.get('/getActiveProject', getActiveProject)
router.get('/getInActiveProject', getInActiveProject)
router.get('/getCompletedProject', getCompletedProject)
router.get('/getPendingProject', getPendingProject)
router.get('/getRejectProject', getRejectProject)
router.get('/editProjectById/:id', editProjectById)
router.get('/viewProjectById/:id', viewProjectById)
router.delete('/deleteProject/:id', deleteProject)
router.put('/deleteProjects/:id', deleteProjects)
router.put('/activeProject/:id', activeProject)
router.put('/InactiveProject/:id', InactiveProject)
router.put('/updateProject/:id', updateProject)
router.put('/approvalCompletedRemarks/:id', approvalCompletedRemarks)
router.put('/approvalRejectedRemarks/:id', approvalRejectedRemarks)
router.get('/projectCount', projectCount),

router.get('/projectActiveCount', projectActiveCount),
router.get('/projectInActiveCount', projectInActiveCount),
router.get('/projectCompletedCount', projectCompletedCount),
router.get('/projectPendingCount', projectPendingCount),
router.get('/projectRejectCount', projectRejectCount),

router.put('/toggleIsAllow', toggleIsAllow)

export default router
