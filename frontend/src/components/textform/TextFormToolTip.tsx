import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";

type propsType = {
  label: string;
  required?: boolean;
  value?: string;
  text?: string;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
};

const TextFormToolTip = ({
  label,
  required = false,
  value,
  text,
  changeHandler,
  children,
}: propsType) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <TextField
        label={label}
        required={required}
        value={value}
        maxRows={1}
        variant="standard"
        onChange={changeHandler}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">円</InputAdornment>,
          },
        }}
      />
      <Tooltip title={text} placement="right">
        <IconButton sx={{ paddingTop: "20px", paddingX: 0 }}>
          {children}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TextFormToolTip;
