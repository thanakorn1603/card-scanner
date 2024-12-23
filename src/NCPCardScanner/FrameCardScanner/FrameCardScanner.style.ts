import styled from "@emotion/styled";
import { Box, keyframes } from "@mui/material";
import { CornerProps } from "./FrameCardScanner.interface";

const blinkAnimation = keyframes`
  /* 0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; } */
  0% {
    filter: brightness(1);
    opacity: 0;
  }
  20% {
    filter: brightness(1.5);
    opacity: 1;
  }
  40% {
    filter: brightness(2);
    opacity: 0;
  }
  60% {
    filter: brightness(1.5);
    opacity: 1;
  }
  80% {
    filter: brightness(1);
    opacity: 0;
  }
  100% {
    filter: brightness(1.5);
    opacity: 1;
  }
`;

export const FrameCardScannerStyled = styled(Box)<any>(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "#cfd2d2",
  height: "400px",
  width: "800px",
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    width: "100dvw",
    height: "100dvh",
    zIndex: 1,
    top: 0,
    left: 0,
  },
}));

export const FrameContainerStyled = styled(Box)<any>(({ theme }) => ({
  position: "absolute",
  aspectRatio: "3 / 2",
  transform: "translate(-50%, -50%)",
  left: "50%",
  top: "50%",
  backgroundColor: "transparent",
  zIndex: 3,
  width: "600px",
  border: "60px solid rgba(68, 68, 68, 0.5)",
  borderBottom: "70px solid rgba(68, 68, 68, 0.5)",
  borderTop: "70px solid rgba(68, 68, 68, 0.5)",
  [theme.breakpoints.down("md")]: {
    border: "none",
    outline: "1000px solid  rgba(68, 68, 68, 0.5)",
  },
}));

export const FrameInContainerStyled = styled(Box)<any>({
  position: "relative",
  width: "100%",
  height: "100%",
});

export const AvatarCardIconStyled = styled(Box)({
  position: "absolute",
  bottom: "9%",
  right: "3%",
  height: "40%",
  svg: {
    width: "100%",
    height: "100%",
  },
});

export const CornerStyled = styled("div")<CornerProps>(({ isBlink }) => ({
  position: "absolute",
  width: "40px",
  height: "40px",
  animation: isBlink ? `${blinkAnimation} 1s infinite` : "none",

  // Top Left
  '&[data-position="top-left"]': {
    top: "-5px",
    left: "-5px",
    borderTop: "8px solid #A5C15F",
    borderLeft: "8px solid #A5C15F",
    borderTopLeftRadius: "12px",
  },

  // Top Right
  '&[data-position="top-right"]': {
    top: "-5px",
    right: "-5px",
    borderTop: "8px solid #A5C15F",
    borderRight: "8px solid #A5C15F",
    borderTopRightRadius: "12px",
  },

  // Bottom Left
  '&[data-position="bottom-left"]': {
    bottom: "-5px",
    left: "-5px",
    borderBottom: "8px solid #A5C15F",
    borderLeft: "8px solid #A5C15F",
    borderBottomLeftRadius: "12px",
  },

  // Bottom Right
  '&[data-position="bottom-right"]': {
    bottom: "-5px",
    right: "-5px",
    borderBottom: "8px solid #A5C15F",
    borderRight: "8px solid #A5C15F",
    borderBottomRightRadius: "12px",
  },
}));
