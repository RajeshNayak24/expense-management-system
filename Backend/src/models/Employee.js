import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['EMPLOYEE', 'MANAGER'], default: 'EMPLOYEE' },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  password: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('Employee', employeeSchema)