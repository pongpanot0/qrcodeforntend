import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import CastIcon from "@mui/icons-material/Cast";
import LivingIcon from "@mui/icons-material/Living";
export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Setting",
    path: "/Setting",
    icon: <LivingIcon />,
    cName: "nav-text",
  },
  {
    title: "device",
    path: "/DeviceDisplay",
    icon: <CastIcon />,
    cName: "nav-text",
  },
  {
    title: "logout",
    path: "/",
    icon: <LogoutIcon />,
    cName: "nav-text",
  },
];
