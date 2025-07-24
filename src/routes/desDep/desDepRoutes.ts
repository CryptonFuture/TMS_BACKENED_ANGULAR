import express from "express"
import { getDesDep } from '../../controllers/desDepController/desDepController'

const router = express.Router()

router.get('/getDesDep', getDesDep)

export default router
