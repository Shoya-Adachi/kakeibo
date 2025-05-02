import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type dialogProps = {
  title: string;
  text: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  agreeFunction: () => void;
};

export const ConfirmationDialog = ({
  open,
  title,
  text,
  setOpen,
  agreeFunction,
}: dialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={agreeFunction}>はい</Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          autoFocus
        >
          戻る
        </Button>
      </DialogActions>
    </Dialog>
  );
};
