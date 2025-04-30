import { Box, Typography } from "@mui/material";
import AppSideBar from "./components/sidebar/AppSidebar";
import React from "react";

type LayoutProps = {
  title: String;
  children: React.ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <AppSideBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "50px",
          paddingTop: "30px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "primary.main",
            textAlign: "left",
            marginBottom: "50px",
          }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
