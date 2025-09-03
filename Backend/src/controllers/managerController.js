import Employee from '../models/Employee.js'
import Expense from '../models/Expense.js'
import mongoose from 'mongoose'


export const getAllManagerDetails = async (req, res) => {
  try {
    const managers = await Employee.find({ role: 'MANAGER' }).select('name email _id')
    res.json(managers)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


export const getEmployeesUnderManager = async (req, res) => {
  try {
    const { mngId } = req.query
    if (!mongoose.Types.ObjectId.isValid(mngId)) {
      return res.status(400).json({ error: 'Invalid manager ID' })
    }

    const employees = await Employee.find({ managerId: new mongoose.Types.ObjectId(mngId) })
      .select('name email _id')

    res.json(employees)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


export const getExpensesUnderManager = async (req, res) => {
  try {
    const { mngId } = req.query
    
    const employees = await Employee.find({ managerId: mngId }).select('_id')
    const empIds = employees.map(emp => emp._id)

    const expenses = await Expense.find({ empId: { $in: empIds } })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}