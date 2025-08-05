import express from "express"
import { 
    AddClient,
    getClient,
    getExistingClient,
    getNonExistingClient,
    updateClient,
    deleteClient,
    deleteClients,
    editClientById,
    viewClientById,
    clientCount,
    existingClientCount,
    NonExistingClientCount
} from '../../controllers/client/clientController'

const router = express.Router()

router.post('/AddClient', AddClient)
router.get('/getClient', getClient)
router.get('/getExistingClient', getExistingClient)
router.get('/getNonExistingClient', getNonExistingClient)
router.get('/editClientById/:id', editClientById)
router.get('/viewClientById/:id', viewClientById)
router.delete('/deleteClient/:id', deleteClient)
router.put('/deleteClients/:id', deleteClients)
router.put('/updateClient/:id', updateClient)
router.get('/clientCount', clientCount),

router.get('/existingClientCount', existingClientCount),
router.get('/NonExistingClientCount', NonExistingClientCount)

export default router
