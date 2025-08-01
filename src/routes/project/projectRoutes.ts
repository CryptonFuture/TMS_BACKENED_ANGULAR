import express from "express"
import { AddProject, getProject, toggleIsAllow, editProjectById, viewProjectById, deleteProject, deleteProjects, updateProject, projectCount } from '../../controllers/project/projectController'

const router = express.Router()

router.post('/AddProject', AddProject)
router.get('/getProject', getProject)
router.get('/editProjectById/:id', editProjectById)
router.get('/viewProjectById/:id', viewProjectById)
router.delete('/deleteProject/:id', deleteProject)
router.put('/deleteProjects/:id', deleteProjects)
router.put('/updateProject/:id', updateProject)
router.get('/projectCount', projectCount),
router.put('/toggleIsAllow', toggleIsAllow)


export default router
