import express from "express"
import { getProjectStatus } from '../../controllers/projectStatus/projectStatusController'

const router = express.Router()

router.get('/getProjectStatus', getProjectStatus)

export default router
