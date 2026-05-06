import express from "express"
import { 
    AddEmpAssign,
   updateEmpAssign,
   getEmpAssign,
   editEmpAssignyId,
   viewEmpAssignById,
   empAssignCount,
   deleteEmpAssign,
   deleteEmpAssigns,
   getEmpAssignByIdLimited
} from '../../controllers/employee-assignment/employeeAssignmentController'

const router = express.Router()

router.post('/addEmpAssign', AddEmpAssign)
router.put('/updateEmpAssign/:id', updateEmpAssign)
router.get('/getEmpAssign', getEmpAssign)
router.get('/editEmpAssignyId/:id', editEmpAssignyId)
router.get('/viewEmpAssignById/:id', viewEmpAssignById)
router.get('/empAssignCount', empAssignCount)
router.delete('/deleteEmpAssign/:id', deleteEmpAssign)
router.put('/deleteEmpAssigns/:id', deleteEmpAssigns)
router.get('/emp-assign/limited', getEmpAssignByIdLimited);


export default router
