import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const AppSideBar = () => {
  const navigate = useNavigate();

  const menu = [
    { label: "HOME", icon: <HomeIcon />, path: "" },
    { label: "家計簿入力", icon: <CreateIcon />, path: "KakeiboInput-page" },
    {
      label: "家計簿一覧",
      icon: <CalendarMonthIcon />,
      path: "KakeiboList-page",
    },
    // { label: "固定費管理", icon: <SettingsIcon />, path: "*" },
  ];

  const clickHandler = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <Box sx={{ width: "250px", height: "100vh", bgcolor: "secondary.main" }}>
      <Box
        sx={{
          height: "50%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "secondary.contrastText", marginTop: 5 }}
        >
          Kakeibo
        </Typography>
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{ color: "secondary.contrastText" }}
                onClick={() => clickHandler(item.path)}
              >
                <ListItemIcon sx={{ color: "secondary.contrastText" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AppSideBar;
