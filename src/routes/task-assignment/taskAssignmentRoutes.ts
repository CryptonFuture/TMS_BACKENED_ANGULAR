import express from "express"
import { 
   AddTaskAssign,
   updateTaskAssign,
   getTaskAssign,
   editTaskAssignById,
   viewTaskAssignById,
   taskAssignCount,
   deleteTaskAssign,
   deleteTaskAssigns
} from '../../controllers/task-assignment/taskAssignController'

const router = express.Router()

router.post('/addTaskAssign', AddTaskAssign)
router.put('/updateTaskAssign/:id', updateTaskAssign)
router.get('/getTaskAssign', getTaskAssign)
router.get('/editTaskAssignById/:id', editTaskAssignById)
router.get('/viewTaskAssignById/:id', viewTaskAssignById)
router.get('/taskAssignCount', taskAssignCount)
router.delete('/deleteTaskAssign/:id', deleteTaskAssign)
router.put('/deleteTaskAssigns/:id', deleteTaskAssigns)

export default router
