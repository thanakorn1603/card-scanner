import { styled } from "@mui/system";

export const CardScannerAllowCameraSpinnerContainerStyled = styled("div")({
  width: "100%",
  textAlign: "center",
  padding: "1rem",
  gap: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "384px",
  backgroundColor: "#000",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 2000,
  color: "#fff",

  ".titleLabel": {
    fontWeight: 700,
    fontSize: "40px",
    lineHeight: "40px",
  },

  ".subTitleLabel": {
    fontSize: "24px",
    lineHeight: "28px",
  },
});
