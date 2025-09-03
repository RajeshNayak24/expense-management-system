import Expense from '../models/Expense.js'
import Employee from '../models/Employee.js'
import mongoose from 'mongoose'


export const addExpenseWithFile = async (req, res) => {
  try {
    const { empId,managerId, category, amount, date } = req.body
    const expense = new Expense({
      empId,
      managerId,
      category,
      amount,
      date,
      receiptUrl: req.file ? `/uploads/${req.file.filename}` : null
    })
    await expense.save()
    res.status(201).json(expense)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


export const getEmpHistory = async (req, res) => {
  try {
    const expenses = await Expense.find({ empId: req.query.empId })
    res.json(expenses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getPieChart = async (req, res) => {
  try {
    const { empId } = req.query

    const result = await Expense.aggregate([
      { $match: { empId: new mongoose.Types.ObjectId(empId) } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ])

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getLineGraph = async (req, res) => {
  try {
    const { empId } = req.query

    const result = await Expense.aggregate([
      { $match: { empId: new mongoose.Types.ObjectId(empId) } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ])

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const formatted = result.map(r => ({
      month: months[r._id - 1],
      total: r.total
    }))

    res.json(formatted)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


export const getManagerPieChart = async (req, res) => {
  try {
    const { managerId, date } = req.query
    const [day, month, year] = date.split("-").map(Number)

    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 0, 23, 59, 59)

    
    const employees = await Employee.find({ managerId: new mongoose.Types.ObjectId(managerId) }).select('_id')
    const empIds = employees.map(e => e._id)

    const result = await Expense.aggregate([
      { $match: { empId: { $in: empIds }, date: { $gte: start, $lte: end } } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ])

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


export const getEmpCategoryTable = async (req, res) => {
  try {
    const { empId, date } = req.query
    const [day, month, year] = date.split("-").map(Number)

    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 0, 23, 59, 59)

    const result = await Expense.aggregate([
      { $match: { empId: new mongoose.Types.ObjectId(empId), date: { $gte: start, $lte: end } } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ])

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}