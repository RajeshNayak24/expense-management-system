import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

import ManagerHome from './ManagerComponents/ManagerHome1';
import PopUp from './AddExpense/PopUp';
import { EmployeeDetails, managerDetails, setMng } from '../service/ApiService';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EmployeeDashboard from "./EmployeeDashboard";

export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [data, setData] = useState([])
  const [manager, setManager] = useState([])

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("✅ NavigationBar mounted. Current path:", location.pathname);

    EmployeeDetails().then((response) => {
      setData(response.data)
      console.log("EmployeeDetails" , data)
      console.log("✅ Employee details:", response.data)
    }).catch(error => {
      console.log("❌ Error fetching employee details:", error);
    })

    managerDetails().then((response) => {
      setManager(response.data)
      console.log("✅ Manager details:", response.data)
    }).catch(error => {
      console.log("❌ Error fetching manager details:", error);
    })
  }, [location.pathname])

  console.log("Debug → data.role:", data.role)
  console.log("Debug → data.mgnId:", data.mgnId);
  setMng(data.mgnId)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    localStorage.clear();
    navigate("/");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{data.empName}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, color: "red" }}>
      <AppBar position="static" sx={{ bgcolor: '#121c4e', boxShadow: '5px 5px 10px #dad6d1,-5px -5px 10px #ffffff' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => navigate("/dashboard")}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color: '#f5f5f5' } }}
          >
            Expense Management
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {manager.some(manager1 => manager1.mgnId === data.empId) ? (
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={() => navigate("/dashboard/manager")}
              color="inherit"
            >
              <ManageAccountsIcon />
            </IconButton>
          ) : null}

          <PopUp data={data} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ borderRadius: 0, ml: 3, color: "#f5f5f5" }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block', fontStyle: 'italic', fontSize: 'medium' } }}
              >
                {data.empName}
              </Typography>
              <AccountCircle sx={{ fontSize: 35, mx: 1 }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {/* Nested Routes */}
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="manager" element={<ManagerHome />} />
      </Routes>
    </Box>
  );
}