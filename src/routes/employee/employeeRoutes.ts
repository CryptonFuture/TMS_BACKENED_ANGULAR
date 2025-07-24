import express from "express"
import { getActiveEmp, getInActiveEmp } from '../../controllers/employee/employeeController'

const router = express.Router()

router.get('/getActiveEmp', getActiveEmp)
router.get('/getInActiveEmp', getInActiveEmp)

export default router
