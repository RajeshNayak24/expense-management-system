import { Router } from "express";
import multer from "multer";
import {
  addExpenseWithFile,
  getEmpHistory,
  getPieChart,
  getLineGraph,
  getManagerPieChart,
  getEmpCategoryTable,
} from "../controllers/expenseController.js";
import {
  getEmployeesUnderManager,
  getExpensesUnderManager,
} from "../controllers/managerController.js";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "Expense API working 🚀" });
});
router.post("/addExpensewithfile", upload.single("file"), addExpenseWithFile);
router.get("/empHistory", getEmpHistory);
router.get("/employeesUnderManger", getEmployeesUnderManager);
router.get("/expensesUnderManger", getExpensesUnderManager);
router.get('/pieChart', getPieChart)
router.get('/lineGraph', getLineGraph)
router.get('/managerpiechart', getManagerPieChart)
router.get('/empcatogerytable', getEmpCategoryTable)


export default router;
