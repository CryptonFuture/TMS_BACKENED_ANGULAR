import express from "express"
import { getActiveEmp, getInActiveEmp, editEmpById, toggleStatus, toggleAdmin, deleteEmp } from '../../controllers/employee/employeeController'

const router = express.Router()

router.get('/getActiveEmp', getActiveEmp)
router.get('/getInActiveEmp', getInActiveEmp)
router.get('/editEmpById/:id', editEmpById)
router.put('/toggleStatus', toggleStatus)
router.put('/toggleAdmin', toggleAdmin)
router.delete('/deleteEmp/:id', deleteEmp)

export default router
