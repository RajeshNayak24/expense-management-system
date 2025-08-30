import { Router } from 'express'
import { getEmployeeDetails } from '../controllers/employeeController.js'

const router = Router()

router.get('/Details/:id', getEmployeeDetails)

export default router