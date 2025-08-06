import express from "express"
import { addAssignEmployeeToClient, getAssignEmp, assignEmpCount, unAssignEmpCount, updateAllocEmp, getUnAssignEmp, deleteAllocEmp, deleteAllocationEmp, editAllocEmpById, viewAllocEmpById } from '../../controllers/assign-emp-to-client/assignEmpToClientController'

const router = express.Router()

router.post('/addAssignEmployeeToClient', addAssignEmployeeToClient)
router.get('/getAssignEmp', getAssignEmp)
router.get('/getUnAssignEmp', getUnAssignEmp)
router.get('/editAllocEmpById/:id', editAllocEmpById)
router.get('/viewAllocEmpById/:id', viewAllocEmpById)
router.delete('/deleteAllocationEmp/:id', deleteAllocationEmp)
router.put('/deleteAllocEmp/:id', deleteAllocEmp)
router.put('/updateAllocEmp/:id', updateAllocEmp)
router.get('/assignEmpCount', assignEmpCount)
router.get('/unAssignEmpCount', unAssignEmpCount)

export default router
