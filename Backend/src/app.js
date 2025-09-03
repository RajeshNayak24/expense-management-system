import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'


import expenseRoutes from './routes/expense.js'
import employeeRoutes from './routes/employee.js'
import authRoutes from './routes/auth.js'
import managerRoutes from './routes/manager.js'


const app = express()


app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))


app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use('/expense', expenseRoutes)
app.use('/employee', employeeRoutes)
app.use('/', authRoutes)
app.use('/manager', managerRoutes)

export default app;


