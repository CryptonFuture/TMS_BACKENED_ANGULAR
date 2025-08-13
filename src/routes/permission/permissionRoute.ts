import express from "express"
import { getPermission, AddPermission, updatePermission, permissionCount, editPermissionById, viewPermissionById, deletePermission, deletePermissions } from '../../controllers/permission/permissionController'

const router = express.Router()

router.post('/addPermission', AddPermission)
router.get('/getPermission', getPermission)
router.get('/permissionCount', permissionCount)
router.put('/updatePermission/:id', updatePermission)
router.get('/editPermissionById/:id', editPermissionById)
router.get('/viewPermissionById/:id', viewPermissionById)
router.delete('/deletePermission/:id', deletePermission)
router.put('/deletePermissions/:id', deletePermissions)

export default router
