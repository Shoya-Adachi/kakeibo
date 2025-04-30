import { InputAdornment, TextField } from "@mui/material";

type TextFormProps = {
  label: string;
  value?: string;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const TextForm = ({
  label,
  value = "",
  changeHandler,
  required = false,
}: TextFormProps) => {
  return (
    <TextField
      label={label}
      required={required}
      maxRows={1}
      variant="standard"
      value={value}
      onChange={changeHandler}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">円</InputAdornment>,
        },
      }}
    />
  );
};

export default TextForm;
