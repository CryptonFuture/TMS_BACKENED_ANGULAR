import express from "express"
import { getTask, AddTask, updateTask, taskCount, editTaskById, viewTaskById, deleteTask, deleteTasks } from '../../controllers/task/TaskController'

const router = express.Router()

router.post('/addTask', AddTask)
router.get('/getTask', getTask)
router.get('/taskCount', taskCount)
router.put('/updateTask/:id', updateTask)
router.get('/editTaskById/:id', editTaskById)
router.get('/viewTaskById/:id', viewTaskById)
router.delete('/deleteTask/:id', deleteTask)
router.put('/deleteTasks/:id', deleteTasks)

export default router
