import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [personnelStatus, setPersonnelStatus] = useState(60);

  const leaveData = [
    { type: "Annual Leave", days: 18 },
    { type: "Sick Leave", days: 12 },
    { type: "Emergency Leave", days: 5 },
    { type: "Special Leave", days: 3 },
  ];

  const handleNavClick = (navItem) => setActiveNav(navItem);

  useEffect(() => {
    const interval = setInterval(() => {
      setPersonnelStatus((prev) => (prev === 60 ? 65 : 60));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      {/* Header */}
      <Box className="dashboard-header">
        <Box className="header-left">
          <Box className="header-title">
            <Typography variant="h1" component="h1">
              MILITARY PERSONNEL DASHBOARD
            </Typography>
            <Typography variant="body2">
              Welcome, Staff Sergeant Johnson
            </Typography>
          </Box>
        </Box>

        <Box className="header-right">
          <Box className="user-info">
            <Box className="user-avatar">MJ</Box>
            <Box className="user-details">
              <Box className="name">Michael Johnson</Box>
              <Box className="rank">Staff Sergeant | ID: 487239</Box>
            </Box>
          </Box>

          <Box
            className="alert-badge"
            onClick={() => alert("You have 3 new notifications")}
          >
            <i className="fas fa-bell"></i>
          </Box>

          <Button
            style={{
              background: "var(--alert-red)",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </Button>
        </Box>
      </Box>

      {/* Main content */}
      <Box className="dashboard-container">
        <Box className="sidebar">
          <Box className="nav-items">
            {["dashboard", "personnel", "leave", "reports", "tasks", "settings"].map(
              (item) => (
                <Box
                  key={item}
                  className={`nav-item ${activeNav === item ? "active" : ""}`}
                  onClick={() => handleNavClick(item)}
                >
                  <i className={`fas fa-${item === "dashboard" ? "home" : item}`}></i>{" "}
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Box>
              )
            )}
          </Box>
        </Box>

        <Box className="main-content">
          {/* Leave Balance Widget */}
          <Paper className="widget leave-balance" elevation={0}>
            <Box className="widget-header">
              <span>
                <i className="fas fa-calendar-check"></i> Leave Balance
              </span>
              <i className="fas fa-info-circle"></i>
            </Box>
            <Box className="widget-body">
              {leaveData.map((leave, index) => (
                <Box key={index} className="leave-type">
                  <span>{leave.type}</span>
                  <span className="leave-days">{leave.days} days</span>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
