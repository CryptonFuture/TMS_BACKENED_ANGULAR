import express from "express"
import { getLogs, logsCount } from '../../controllers/logs/logsController'

const router = express.Router()

router.get('/getLogs', getLogs)
router.get('/logsCount', logsCount)

export default router
