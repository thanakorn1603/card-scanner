import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const CardScannerAllowCameraSpinnerContainerStyled = styled(Box)<any>(({ theme }) => ({
  width: "100%",
  height: "384px",
  textAlign: "center",
  padding: "1rem",
  gap: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#000",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 2000,
  color: "#fff",

  [theme.breakpoints.down("sm")]: {
    height: "100dvh",
  },

  ".titleLabel": {
    fontWeight: 700,
    fontSize: "40px",
    lineHeight: "40px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "32px",
      lineHeight: "32px",
    },
  },

  ".subTitleLabel": {
    fontSize: "24px",
    lineHeight: "28px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      lineHeight: "22px",
    },
  },
}));
