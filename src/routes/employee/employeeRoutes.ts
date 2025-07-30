import express from "express"
import { employeeAllCount, employeeActiveCount, employeeInActiveCount, getActiveEmp, getInActiveEmp, updateUser, deleteUsers, editEmpById, toggleStatus, viewEmpById, toggleAdmin, deleteEmp } from '../../controllers/employee/employeeController'

const router = express.Router()

router.get('/getActiveEmp', getActiveEmp)
router.get('/getInActiveEmp', getInActiveEmp)
router.get('/editEmpById/:id', editEmpById)
router.get('/viewEmpById/:id', viewEmpById)
router.get('/employeeAllCount', employeeAllCount)
router.get('/employeeInActiveCount', employeeInActiveCount)
router.get('/employeeActiveCount', employeeActiveCount)
router.put('/toggleStatus', toggleStatus)
router.put('/toggleAdmin', toggleAdmin)
router.put('/updateUser/:id', updateUser)
router.put('/toggleDeleted/:id', deleteUsers)
router.delete('/deleteEmp/:id', deleteEmp)

export default router
