import express from "express"
import { getEp, EpCount } from '../../controllers/endpoints/endPointsController'

const router = express.Router()

router.get('/getEp', getEp)
router.get('/ePCount', EpCount)

export default router
