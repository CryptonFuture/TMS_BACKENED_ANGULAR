import express from "express"
import { getRoutes } from '../../controllers/route/routeController'

const router = express.Router()

router.get('/getRoutes', getRoutes)

export default router
