import { IconButton, Tooltip } from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const LabelTooltip = () => {
  return (
    <Tooltip title="test">
      <IconButton>
        <ContactSupportIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LabelTooltip;
