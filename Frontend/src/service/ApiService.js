import axios from "axios";

let currentUserId = localStorage.getItem("currentUserId") || null;
let currentManagerId = localStorage.getItem("currentUserId") || null;

export const setUser = (userId) => {
  currentUserId = userId;
  localStorage.setItem("currentUserId", userId);
  console.log("✅ Current User ID set:", currentUserId);
};

export const setMng = (mngId) => {
  currentManagerId = mngId;
  localStorage.setItem("currentManagerId", mngId);
  console.log("✅ Current Manager ID set:", currentManagerId);
};

export const auth = async (user) => {
  try {
    const response = await axios.post("http://localhost:8080/login", user);

    const { token, user: userData } = response.data;
    console.log("Login response:", response.data);
    console.log("Login rajesh:", userData);

    localStorage.setItem("SavedToken", token);
    localStorage.setItem("Loginstatus", "true");
    localStorage.setItem("UserId", userData.id);
    localStorage.setItem("UserRole", userData.role);

    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    if (userData.role === "EMPLOYEE") {
      setUser(userData.id);
      console.log("✅ setUser(userData.id);", userData.id);
    } else if (userData.role === "MANAGER") {
      setMng(userData.id);
      console.log("✅ setUser(userData.id);", userData.id);
    }

    console.log("Login successful:", userData);
    return { token, user: userData };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export const addExpense = (userdata) => {
  return axios.post(
    "http://localhost:8080/expense/addExpensewithfile",
    userdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("SavedToken"),
      },
    }
  );
};

export const getExpenseByEmployee = async () => {
  return await axios.get(
    `http://localhost:8080/expense/empHistory?empId=${currentUserId}`,
    { headers: { Authorization: localStorage.getItem("SavedToken") } }
  );
};

export const getExpenseByManager = async () => {
  return await axios.get(
    `http://localhost:8080/expense/employeesUnderManger?mngId=${currentManagerId}`,
    { headers: { Authorization: localStorage.getItem("SavedToken") } }
  );
};

export const getAllExpenseByManager = async () => {
  return await axios.get(
    `http://localhost:8080/expense/expensesUnderManger?mngId=${currentManagerId}`,
    { headers: { Authorization: localStorage.getItem("SavedToken") } }
  );
};

export const pieChart = async () => {
  return await axios.get(
    `http://localhost:8080/expense/pieChart?empId=${currentUserId}`,
    { headers: { Authorization: localStorage.getItem("SavedToken") } }
  );
};

export const lineChart = async () => {
  return await axios.get(
    `http://localhost:8080/expense/lineGraph?empId=${currentUserId}`,
    { headers: { Authorization: localStorage.getItem("SavedToken") } }
  );
};

export const pieChartManager = async () => {
  const currentDate = formatDate(new Date());
  return await axios.get(
    `http://localhost:8080/expense/managerpiechart?managerId=${currentManagerId}&date=${currentDate}`,
    { headers: { Authorization: localStorage.getItem("SavedToken") } }
  );
};

export const CategoryForLineChart = async () => {
  const currentDate = formatDate(new Date());
  return await axios.get(
    `http://localhost:8080/expense/empcatogerytable?empId=${currentUserId}&date=${currentDate}`,
    { headers: { Authorization: localStorage.getItem("SavedToken") } }
  );
};

export const EmployeeDetails = async () => {
  console.log("🟢 Debug: currentUserId =", currentUserId);
  console.log("🟢 Debug: SavedToken =", localStorage.getItem("SavedToken"));
  return await axios.get(
    `http://localhost:8080/employee/Details/${currentUserId}`,
    { headers: { Authorization: localStorage.getItem("SavedToken") } }
  );
};

export const managerDetails = async () => {
  return await axios.get(`http://localhost:8080/manager/allDetails`, {
    headers: { Authorization: localStorage.getItem("SavedToken") },
  });
};

export function singleexpenseDetails(empId, expenseId) {
  return axios.get(
    `http://localhost:8080/expense/detailsemployee?empId=${empId}&expenseId=${expenseId}`,
    { headers: { Authorization: localStorage.getItem("SavedToken") } }
  );
}

export function statusChange(status) {
  return axios.post(`http://localhost:8080/expense/status`, status, {
    headers: { Authorization: localStorage.getItem("SavedToken") },
  });
}
