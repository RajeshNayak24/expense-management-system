import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Employee from '../models/Employee.js'
import Expense from '../models/Expense.js'

async function seed() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ems')
    console.log('✅ Connected to MongoDB')

    const hashedPassword = await bcrypt.hash('123456', 10)

    // Clear existing data
    await Employee.deleteMany({})
    await Expense.deleteMany({})

    // Create Managers
    const manager1 = new Employee({
      name: 'Manager One',
      email: 'manager1@example.com',
      role: 'MANAGER',
      password: hashedPassword
    })

    const manager2 = new Employee({
      name: 'Manager Two',
      email: 'manager2@example.com',
      role: 'MANAGER',
      password: hashedPassword
    })

    await manager1.save()
    await manager2.save()

    // Create Employees under managers
    const emp1 = new Employee({
      name: 'Employee One',
      email: 'emp1@example.com',
      role: 'EMPLOYEE',
      managerId: manager1._id,
      password: hashedPassword
    })

    const emp2 = new Employee({
      name: 'Employee Two',
      email: 'emp2@example.com',
      role: 'EMPLOYEE',
      managerId: manager1._id,
      password: hashedPassword
    })

    const emp3 = new Employee({
      name: 'Employee Three',
      email: 'emp3@example.com',
      role: 'EMPLOYEE',
      managerId: manager2._id,
      password: hashedPassword
    })

    const emp4 = new Employee({
      name: 'Employee Four',
      email: 'emp4@example.com',
      role: 'EMPLOYEE',
      managerId: manager2._id,
      password: hashedPassword
    })

    await emp1.save()
    await emp2.save()
    await emp3.save()
    await emp4.save()

    // Create some sample expenses
    const expenses = [
      { empId: emp1._id, category: 'Food', amount: 100, status: 'PENDING' },
      { empId: emp1._id, category: 'Travel', amount: 50, status: 'APPROVED' },
      { empId: emp2._id, category: 'Stationery', amount: 30, status: 'REJECTED' },
      { empId: emp3._id, category: 'Food', amount: 120, status: 'PENDING' },
      { empId: emp4._id, category: 'Travel', amount: 70, status: 'APPROVED' }
    ]

    await Expense.insertMany(expenses)

    console.log('✅ Seeded managers, employees, and expenses')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seed()