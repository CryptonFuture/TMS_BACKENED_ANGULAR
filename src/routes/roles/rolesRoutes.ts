import express from "express"
import { getRoles } from '../../controllers/roles/rolesController'

const router = express.Router()

router.get('/getRoles', getRoles)

export default router
