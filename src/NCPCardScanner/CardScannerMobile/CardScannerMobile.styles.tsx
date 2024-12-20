import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";

export const VideoAreaStyled = styled(Box)<any>({
  position: "absolute",
  width: "-webkit-fill-available",
  height: "-webkit-fill-available",
  zIndex: 1,
  top: 0,
  left: 0,
});

export const CanvasStyled = styled('div')<any>({
  position: "absolute",
});

export const VideoStyled = styled("video")<any>(({ theme, resultImage }) => ({
  display: resultImage ? "none" : "block",
  height: "-webkit-fill-available",
  width: "100%",
}));

export const OverlayAreaStyled = styled(Box)<any>(
  ({ theme }) => ({
    minHeight: window.innerHeight,
    width: "-webkit-fill-available",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: theme.breakpoints.down("sm") ? theme.spacing(2) : theme.spacing(3),
    paddingRight: theme.breakpoints.down("sm") ? theme.spacing(2) : theme.spacing(3),
    zIndex: 2,
  })
);

export const OverlayAreaInsideStyled = styled(Box)<any>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: window.innerHeight,
  paddingTop: theme.breakpoints.down("sm") ? theme.spacing(3) : theme.spacing(4),
  paddingBottom: theme.breakpoints.down("sm") ? theme.spacing(3) : theme.spacing(4),
}));

export const TitleScannerStyled = styled(Typography)<any>(
  ({ theme, resultImage }) => ({
    fontWeight: "bold",
    marginBottom: theme.breakpoints.down("sm")
      ? theme.spacing(2)
      : theme.spacing(3),
    textAlign: "center",
    color: resultImage ? theme.palette.primary.main : theme.palette.secondary.light,
  })
);

export const SecurityMessageStyled = styled(Box)<any>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.breakpoints.down("sm") ? theme.spacing(2) : theme.spacing(3),
}));

export const SecurityIconStyled = styled(SecurityIcon)(({ theme }) => ({
  fontSize: theme.breakpoints.down("sm") ? "1.25rem" : "1.5rem",
  color: theme.palette.primary.main,
}));

export const TitleSecurityMessageStyled = styled(Typography)<any>(
  ({ theme, resultImage }) => ({
    color: resultImage ? theme.palette.secondary.dark : theme.palette.secondary.light,
  })
);

export const InstructionsStyled = styled(Box)<any>({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  width: "100%",
});

export const InstructionTextStyled = styled(Typography)<any>(({ theme, resultImage }) => ({
  textAlign: "center",
  marginBottom: theme.breakpoints.down("sm")
    ? theme.spacing(2)
    : theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  color: resultImage ? theme.palette.secondary.main : theme.palette.secondary.light,
  position: "absolute",
  top: resultImage ? "-32px" : "-40px",
  left: "0",
  right: "0",
  zIndex: "9999999",
}));

export const ResultImageStyled = styled("img")<any>(({ resultImage }) => ({
  height: `${(window.innerWidth * 0.8 * 2) / 3}px`,
  width: "80%",
  objectFit: "cover",
  cursor: resultImage ? "pointer" : "default",
  visibility: resultImage ? "visible" : "hidden",
}));

export const ScanInstructionsStyled = styled(Typography)<any>(({ theme, resultImage }) => ({
  color: resultImage ? theme.palette.secondary.main : theme.palette.secondary.light,
  marginTop: "8px",
  marginBottom: theme.breakpoints.down("sm") ? theme.spacing(3) : theme.spacing(4),
  textAlign: "center",
}));

export const ButtonsContainerStyled = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingTop: theme.breakpoints.down("sm") ? theme.spacing(0) : theme.spacing(0, 2),
  paddingBottom: theme.breakpoints.down("sm") ? theme.spacing(0) : theme.spacing(0, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',

}));

export const ButtonStyledOutlined = styled(Button)<any>({

  borderRadius: "1000px",
  boxShadow: "none",
});

export const ButtonStyledContained = styled(Button)<any>({
  marginBottom: "40px",
  borderRadius: "1000px",
  boxShadow: "none",
});
