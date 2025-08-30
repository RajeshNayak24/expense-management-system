import Employee from "../models/Employee.js";

// GET /employee/Details/:id
export const getEmployeeDetails = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select("-password");
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      mgnId: employee.managerId || null, // frontend reads mgnId})
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
