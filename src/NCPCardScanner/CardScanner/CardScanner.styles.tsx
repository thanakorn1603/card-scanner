import { Box, Button } from "@mui/material";
import { keyframes, styled } from "@mui/system";

export const scanning = keyframes({
  "0%": {
    filter: "brightness(1)",
    opacity: 0,
  },
  "20%": {
    filter: "brightness(1.5)",
    opacity: 1,
  },
  "40%": {
    filter: "brightness(2)",
    opacity: 0,
  },
  "60%": {
    filter: "brightness(1.5)",
    opacity: 1,
  },
  "80%": {
    filter: "brightness(1)",
    opacity: 0,
  },
  "100%": {
    filter: "brightness(1.5)",
    opacity: 1,
  },
});

export const ThaiIdDetectorStyled = styled(Box)({
  "& .innerWrap": {
    height: "384px",
    position: "relative",
    zIndex: 1,
    "& .borderFrame": {
      height: "384px",
      position: "absolute",
      aspectRatio: "3 / 2",
      transform: "translate(-50%, -50%)",
      left: "50%",
      top: "50%",
      width: "100%",
      backgroundColor: "transparent",
      border: "100px solid rgba(0, 0, 0, 0.2)",
      borderWidth: "90px 153px",
      "&:before": {
        zIndex: 1000,
        display: "block",
        content: '""',
        width: "51px",
        height: "51px",
        position: "absolute",
        top: "-2px",
        left: "-2px",
        borderRadius: "7px 0 0 0",
        borderTop: "3px solid #73c23a",
        borderLeft: "3px solid #73c23a",
      },
      "&:after": {
        zIndex: 1000,
        display: "block",
        content: '""',
        width: "51px",
        height: "51px",
        position: "absolute",
        top: "-2px",
        right: "-2px",
        borderRadius: "0 7px 0 0",
        borderTop: "3px solid #73c23a",
        borderRight: "3px solid #73c23a",
      },
      "&.isScanning": {
        "&:after, &:before, *:after, *:before": {
          animation: `${scanning} 1s ease-in-out infinite`,
        },
      },
      "& .borderCardIdContainerWrap": {
        "&:after": {
          zIndex: 1000,
          display: "block",
          content: '""',
          width: "51px",
          height: "51px",
          position: "absolute",
          bottom: "-2px",
          right: "-2px",
          borderRadius: "0 0 7px 0",
          borderBottom: "3px solid #73c23a",
          borderRight: "3px solid #73c23a",
        },
        "&:before": {
          zIndex: 1000,
          display: "block",
          content: '""',
          width: "51px",
          height: "51px",
          position: "absolute",
          bottom: "-2px",
          left: "-2px",
          borderRadius: "0 0 0 7px",
          borderBottom: "3px solid #73c23a",
          borderLeft: "3px solid #73c23a",
        },
      },
    },
  },
  "& .containerCamera": {
    position: "relative",
    width: "100%",
    height: "100%",
    aspectRatio: "3 / 2",
  },
  "& .borderCardIdContainer": {
    overflow: "hidden",
    borderRadius: "10px",
    zIndex: 100,
    position: "absolute",
    width: "100%",
    height: "100%",
    aspectRatio: "3 / 2",
    transform: "translate(-50%, -50%)",
    left: "50%",
    top: "50%",
  },
  "& .borderCardId": {
    overflow: "hidden",
    border: "2px solid #ffffff",
    borderRadius: "2px",
    zIndex: 100,
    position: "absolute",
    width: "20%",
    height: "auto",
    bottom: "21px",
    right: "14px",
    paddingTop: "24px",
  },
  "& .borderInCardId": {
    position: "relative",
    aspectRatio: "1 / 1",
  },
  "& .borderCardIdInContainer": {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  "& .borderCardIdAvatarContainer": {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
  },
  "& .borderHeadCardId": {
    border: "1px solid #ffffff",
    borderRadius: "50%",
    zIndex: 100,
    position: "absolute",
    width: "60%",
    height: "60%",
    aspectRatio: "1 / 1",
    top: "-10%",
    transform: "translateX(-50%)",
    left: "50%",
  },
  "& .borderBodyCardId": {
    border: "1px solid #ffffff",
    borderRadius: "50%",
    zIndex: 100,
    position: "absolute",
    width: "105%",
    height: "100%",
    aspectRatio: "1 / 1",
    bottom: "-50%",
    transform: "translateX(-50%)",
    left: "50%",
  },
  "& .video": {
    width: "100%",
    height: "100%",
  },
  "& .canvasContainer": {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    aspectRatio: "3 / 2",
    border: "2px solid #333",
    backgroundColor: "#f0f0f0",
  },
  "& .canvas": {
    width: "100%",
    height: "100%",
  },
  "& .status": {
    marginTop: "8px",
  },
  "& .status.loading": {
    color: "orange",
  },
  "& .status.ready": {
    color: "green",
  },
  "& .error": {
    color: "red",
    marginTop: "8px",
  },
  "& .matchInfo": {
    marginTop: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  "& .matchInfo.detected": {
    color: "green",
  },
  "& .matchInfo.notDetected": {
    color: "red",
  },
});

export const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: "14px",
  textTransform: "none",
  fontSize: "1rem",
  marginBottom: theme.spacing(1.5),
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: "12px",
    fontSize: "0.95rem",
  },
}));

export const FrameCardInputContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  position: "relative",
  justifyContent: "flex-start",
  flexDirection: "column",
  width: "80%",
  // backgroundColor: "#f3f3f3",
  [theme.breakpoints.down("md")]: {
    minHeight: window.innerHeight,
    width: "-webkit-fill-available",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    px: 2,
    zIndex: 10,
    paddingLeft: "20px",
    paddingRight: "20px",
    position: "absolute",
  },
}));

export const InputButtonContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "0px",
  },
}));
