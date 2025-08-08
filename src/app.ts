import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth/authRoutes'
import employeeRoutes from './routes/employee/employeeRoutes'
import desDepRoutes from './routes/desDep/desDepRoutes'
import addAssignEmployeeToClientRoutes from './routes/assign-emp-to-client/assignEmpToClientRoutes'
import taskRoutes from './routes/task/taskRoutes'
import projectRoutes from './routes/project/projectRoutes'
import projectStatusRoutes from './routes/projectStatus/projectStatusRoutes'
import clientStatusRoutes from './routes/client/clientRoutes'
import empAssignRoutes from './routes/employee-assignment/employeeAssignmentRoutes'
import taskAssignRoutes from './routes/task-assignment/taskAssignmentRoutes'

const prefix = '/api/v1'

dotenv.config()
const app = express()

app.use(cors())
app.use(bodyParser.json({limit: '1gb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '1gb'}))

app.use(prefix, authRoutes)
app.use(prefix, employeeRoutes)
app.use(prefix, desDepRoutes)
app.use(prefix, addAssignEmployeeToClientRoutes)
app.use(prefix, taskRoutes)
app.use(prefix, projectRoutes)
app.use(prefix, projectStatusRoutes)
app.use(prefix, clientStatusRoutes)
app.use(prefix, empAssignRoutes)
app.use(prefix, taskAssignRoutes)

app.get('/', () => {
    console.log('Service is working');
})

export {
    app
}