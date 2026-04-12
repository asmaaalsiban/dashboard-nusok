/** @format */

import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./DashboardLayout.css";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  // useTheme,
  // Badge,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as CartIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Hotel as HotelIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AutoStories as GuideIcon,
} from "@mui/icons-material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LanguageIcon from "@mui/icons-material/Language";
const DRAWER_WIDTH = 280;
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AddCommentIcon from "@mui/icons-material/AddComment";

const DashboardLayout = () => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/login", { replace: true });
    handleMenuClose();
  };

  const menuItems = [
    { text: "لوحة التحكم", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "الحجوزات", icon: <CartIcon />, path: "/dashboard/bookings" },
    { text: "المستخدمين", icon: <PeopleIcon />, path: "/dashboard/users" },
    { text: "الفنادق", icon: <HotelIcon />, path: "/dashboard/hotels" },
    { text: "الباقات", icon: <AssessmentIcon />, path: "/dashboard/packages" },
    { text: "المدن", icon: <LocationCityIcon />, path: "/dashboard/cities" },
    { text: "الرحلات", icon: <LocalAirportIcon />, path: "/dashboard/trips" },
    {
      text: "وسائل النقل",
      icon: <AirportShuttleIcon />,
      path: "/dashboard/transport-services",
    },
    {
      text: "الدليل الشرعي",
      icon: <GuideIcon />,
      path: "/dashboard/religious-guide",
    },
    { text: "المراجعات", icon: <AddCommentIcon />, path: "/dashboard/reviews" },
  ];

  const drawer = (
    <Box className='sidebar-container'>
      {/* Logo Section */}
      <Box className='sidebar-header'>
        <Box className='sidebar-logo'>
          <Typography variant='h4' className='sidebar-logo-text'>
            نُسك
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} className='sidebar-close-btn'>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Menu */}
      <List className='sidebar-menu'>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={item.text}
              disablePadding
              className='sidebar-list-item'>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
                className={`sidebar-menu-item ${isActive ? "active" : ""}`}>
                <ListItemIcon className='sidebar-icon'>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    className: "sidebar-menu-text",
                  }}
                />
                {isActive && (
                  <ChevronLeftIcon className='sidebar-active-indicator' />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box className='dashboard-wrapper'>
      {/* AppBar */}
      <AppBar position='fixed' className='appbar'>
        <Toolbar>
          <Tooltip title='القائمة'>
            <IconButton
              color='inherit'
              edge='start'
              onClick={handleDrawerToggle}
              className='menu-toggle-btn'>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <Typography variant='h6' className='appbar-title'>
            لوحة تحكم الادمن
          </Typography>

          {/* User Menu */}
          <Box className='appbar-user-menu'>
            <IconButton onClick={handleMenuOpen} className='user-avatar-btn'>
              <Avatar className='user-avatar'>م</Avatar>
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className='user-menu'
            PaperProps={{
              className: "user-menu-paper",
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
            <Box className='user-menu-header'>
              <Typography variant='subtitle2' className='user-menu-name'>
                مسؤول النظام
              </Typography>
              <Typography variant='caption' className='user-menu-email'>
                admin@nusok.com
              </Typography>
            </Box>
            <Divider />
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/dashboard/settings");
              }}
              className='user-menu-item'>
              <ListItemIcon>
                <SettingsIcon fontSize='small' />
              </ListItemIcon>
              الإعدادات
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} className='user-menu-logout'>
              <ListItemIcon>
                <LogoutIcon fontSize='small' color='error' />
              </ListItemIcon>
              تسجيل خروج
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant='temporary'
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        className='sidebar-drawer'
        PaperProps={{
          className: "sidebar-drawer-paper",
        }}>
        {drawer}
      </Drawer>

      {/* Backdrop overlay when drawer is open */}
      {drawerOpen && (
        <Box className='sidebar-backdrop' onClick={handleDrawerToggle} />
      )}

      {/* Main Content */}
      <Box className='main-content'>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
