import express from "express"
import { getRoutes,routeCount } from '../../controllers/route/routeController'

const router = express.Router()

router.get('/getRoutes', getRoutes)
router.get('/routeCount', routeCount)

export default router
