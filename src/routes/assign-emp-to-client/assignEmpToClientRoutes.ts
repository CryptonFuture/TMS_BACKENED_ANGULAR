import express from "express"
import { addAssignEmployeeToClient } from '../../controllers/assign-emp-to-client/assignEmpToClientController'

const router = express.Router()

router.post('/addAssignEmployeeToClient', addAssignEmployeeToClient)

export default router
