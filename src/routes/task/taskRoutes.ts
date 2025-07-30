import express from "express"
import { getTask, AddTask, updateTask, editTaskById, viewTaskById, deleteTask, deleteTasks } from '../../controllers/task/TaskController'

const router = express.Router()

router.post('/addTask', AddTask)
router.get('/getTask', getTask)
router.put('/updateTask/:id', updateTask)
router.get('/editTaskById/:id', editTaskById)
router.get('/viewTaskById/:id', viewTaskById)
router.delete('/deleteTask/:id', deleteTask)
router.put('/deleteTasks/:id', deleteTasks)

export default router
