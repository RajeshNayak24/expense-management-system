import { Router } from 'express'
import { getAllManagerDetails } from '../controllers/managerController.js'

const router = Router()

router.get('/allDetails', getAllManagerDetails)

export default router