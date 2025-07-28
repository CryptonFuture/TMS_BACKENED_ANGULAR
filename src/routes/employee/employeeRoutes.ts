import express from "express"
import { getActiveEmp, getInActiveEmp, deleteUsers, editEmpById, toggleStatus, viewEmpById, toggleAdmin, deleteEmp } from '../../controllers/employee/employeeController'

const router = express.Router()

router.get('/getActiveEmp', getActiveEmp)
router.get('/getInActiveEmp', getInActiveEmp)
router.get('/editEmpById/:id', editEmpById)
router.get('/viewEmpById/:id', viewEmpById)
router.put('/toggleStatus', toggleStatus)
router.put('/toggleAdmin', toggleAdmin)
router.put('/toggleDeleted/:id', deleteUsers)
router.delete('/deleteEmp/:id', deleteEmp)

export default router
