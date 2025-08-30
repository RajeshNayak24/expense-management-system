import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
  empId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  receiptUrl: { type: String } // for file uploads
}, { timestamps: true })

export default mongoose.model('Expense', expenseSchema)