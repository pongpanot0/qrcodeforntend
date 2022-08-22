import React, { useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import CastIcon from "@mui/icons-material/Cast";
import LivingIcon from "@mui/icons-material/Living";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

const logout = () => {
  localStorage.clear();
};
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Device",
    path: "/dashboard/DeviceDisplay",
    icon: <CastIcon />,
    cName: "nav-text",
  },
  {
    title: "Personal",
    path: "/dashboard/personal",
    icon: <PersonIcon />,
    cName: "nav-text",
  },
  {
    title: "Qrcode",
    path: "/dashboard/qrcode",
    icon: <PersonIcon />,
    cName: "nav-text",
  },
  {
    title: "Log",
    path: "/dashboard/log",
    icon: <PersonIcon />,
    cName: "nav-text",
  },
  {
    title: "Setting",
    path: "/dashboard/Setting",
    icon: <SettingsIcon />,
    cName: "nav-text",
  },
  {
    title: "logout",
    path: "/users/login",
    icon: <LogoutIcon />,
    cName: "nav-text",
    onclick: logout,
  },
];
