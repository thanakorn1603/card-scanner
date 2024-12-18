import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const CardScannerLoaderSpinnerContainerStyled = styled(Box)<any>(({ theme }) => ({
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  height: "384px", // Default height
  backgroundColor: "#000",
  [theme.breakpoints.down("sm")]: {
    height: "100dvh", // Height for small screens
  },
}));
