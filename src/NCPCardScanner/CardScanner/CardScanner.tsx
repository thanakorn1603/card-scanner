import SecurityIcon from "@mui/icons-material/Security";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  useMediaQuery
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CardScannerAllowCamera from "../CardScannerAllowCamera/CardScannerAllowCamera";
import CardScannerLoader from "../CardScannerLoader/CardScannerLoader";
import FrameCardScanner from "../FrameCardScanner/FrameCardScanner";
import { Area } from "./CardScanner.interface";
import { ButtonStyled } from "./CardScanner.styles";

// Custom theme with mobile-first considerations
const theme = createTheme({
  palette: {
    primary: {
      main: "#73C23A",
    },
    secondary: {
      light: "#FFFFFF",
      main: "#7B7B7B",
      dark: "#555555",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: ["Kanit", "Roboto", "Arial", "sans-serif"].join(","),
    h4: {
      fontSize: "1.75rem",
      [createTheme().breakpoints.down("sm")]: {
        fontSize: "1.5rem",
      },
    },
    body1: {
      fontSize: "1rem",
      [createTheme().breakpoints.down("sm")]: {
        fontSize: "0.95rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      [createTheme().breakpoints.down("sm")]: {
        fontSize: "0.825rem",
      },
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (max-width: 600px)": {
            // paddingLeft: 16,
            // paddingRight: 16,
          },
        },
      },
    },
  },
});

let isLoadCV = false;

const CardScanner: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [areas, setAreas] = useState<Area[]>([
    {
      id: 1,
      x: 30,
      y: window.screen.height / 2 - (window.screen.width * 0.8 * 2) / 3,
      width: 70,
      height: 70,
      isCornerDetected: false,
      cornerCount: 0,
    },
    {
      id: 2,
      x: window.screen.width - 100,
      y: window.screen.height / 2 - (window.screen.width * 0.8 * 2) / 3,
      width: 70,
      height: 70,
      isCornerDetected: false,
      cornerCount: 0,
    },
    {
      id: 3,
      x: 30,
      y: window.screen.height / 2 - 50,
      width: 70,
      height: 70,
      isCornerDetected: false,
      cornerCount: 0,
    },
    {
      id: 4,
      x: window.screen.width - 100,
      y: window.screen.height / 2 - 50,
      width: 70,
      height: 70,
      isCornerDetected: false,
      cornerCount: 0,
    },
  ]);

  const [isAllowCamera, setIsAllowCamera] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const sensitivity = 50; // Adjusted default sensitivity
  const minThreshold = 180;
  const maxThreshold = 200;
  const [resultImage, setResultImage] = useState<string>("");
  let isProcessing: boolean = false;

  useEffect(() => {
    if (resultImage) {
    }
  }, [resultImage]);

  useEffect(() => {
    console.log({
      width: window.innerWidth,
      height: window.innerHeight,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      pixelRatio: window.devicePixelRatio,
    });

    if (!isLoadCV && !window.cv) {


      isLoadCV = true;
      if (document.getElementById("opencv-script")) {
        initializeCamera();
        return;
      }

      const script = document.createElement("script");
      script.id = "opencv-script";
      script.src = "https://docs.opencv.org/4.5.4/opencv.js";
      script.async = true;
      script.onload = initializeCamera;
      document.body.appendChild(script);

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = (
            videoRef.current.srcObject as MediaStream
          ).getTracks();
          tracks.forEach((track) => track.stop());
        }
        isLoadCV = false;
      };
    }
  }, []);

  const requestCamera = async () => {
    try {
      // This will trigger the browser's permission popup
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false, // ถ้าต้องการขอ permission เฉพาะกล้อง ไม่รวมไมค์
      });

      // หลังจากได้รับ permission แล้ว เราสามารถหยุดการใช้งานกล้องได้
      stream.getTracks().forEach((track) => track.stop());

      // ทำงานอื่นๆ หลังจากได้รับ permission
      console.log("Camera permission granted!");
    } catch (error) {
      // กรณีที่ user ปฏิเสธหรือมี error
      console.error("Camera permission denied or error:", error);
    }
  };

  const initializeCamera = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 2213 },
          height: { ideal: 1290 },
          facingMode: "environment", // Use back camera if available
        },
      });
      console.log({ videoRef: videoRef.current, cv: window.cv })
      setIsStreaming(true);
      getSensorCoordinates();
      if (videoRef.current && window.cv) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setIsAllowCamera(false);
      requestCamera();
      console.error("Error accessing camera:", error);
    }
  };

  const detectCardCorners = (src: any): { corners: any; count: number } => {
    try {
      // Convert to grayscale
      const gray = new window.cv.Mat();
      window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY);

      // Apply Gaussian blur
      const blurred = new window.cv.Mat();
      window.cv.GaussianBlur(gray, blurred, new window.cv.Size(5, 5), 0);

      // Apply Canny edge detection
      const edges = new window.cv.Mat();
      window.cv.Canny(blurred, edges, minThreshold, maxThreshold);

      // Dilate edges to connect them
      const dilated = new window.cv.Mat();
      const kernel = window.cv.Mat.ones(3, 3, window.cv.CV_8U);
      window.cv.dilate(edges, dilated, kernel, new window.cv.Point(-1, -1), 1);

      // Find corners using Harris corner detector
      const corners = new window.cv.Mat();
      const none = new window.cv.Mat();
      const blockSize = 2;
      const apertureSize = 3;
      const k = 0.04;

      window.cv.cornerHarris(dilated, corners, blockSize, apertureSize, k);

      // Normalize and threshold corners
      const normalizedCorners = new window.cv.Mat();
      window.cv.normalize(
        corners,
        normalizedCorners,
        0,
        255,
        window.cv.NORM_MINMAX
      );
      window.cv.convertScaleAbs(normalizedCorners, normalizedCorners);

      // Find local maxima
      const maxCorners = 10; // We're looking for exactly 4 corners
      const qualityLevel = sensitivity / 100;
      const minDistance = 10;
      const detectedCorners = new window.cv.Mat();

      window.cv.goodFeaturesToTrack(
        gray,
        detectedCorners,
        maxCorners,
        qualityLevel,
        minDistance,
        dilated // Use dilated edges as mask
      );

      // Cleanup
      gray.delete();
      blurred.delete();
      edges.delete();
      dilated.delete();
      kernel.delete();
      corners.delete();
      normalizedCorners.delete();
      none.delete();

      return { corners: detectedCorners, count: detectedCorners.rows };
    } catch (error) {
      console.error("Corner detection error:", error);
      return { corners: null, count: 0 };
    }
  };

  const calculateAverageBrightness = (imageData: ImageData): number => {
    const data = imageData.data;
    const sum = data.reduce(
      (acc: number, pixel: number, index: number): number => {
        if (index % 4 === 0) {
          // Convert RGB to grayscale using luminosity method
          const gray =
            data[index] * 0.299 +
            data[index + 1] * 0.587 +
            data[index + 2] * 0.114;
          return acc + gray;
        }
        return acc;
      },
      0
    );

    return Math.round(sum / (data.length / 4));
  };

  const analyzeFrame = () => {
    try {
      if (!isStreaming || !window.cv || !canvasRef.current || !videoRef.current)
        return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) return;

      // console.log("----->", {
      //   width: video.videoWidth,
      //   height: video.videoHeight,
      // });
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // const imageDataUrl = canvas.toDataURL("image/png");

      // Draw all areas with red rectangles first
      areas.forEach((area) => {
        context.strokeStyle = "#FF0000";
        context.lineWidth = 2;
        context.strokeRect(area.x, area.y, area.width, area.height);
      });

      let detectCardCornerAll: number[] = [];

      // Process each area
      areas.forEach((area) => {
        try {
          const imageData = context.getImageData(
            area.x,
            area.y,
            area.width,
            area.height
          );

          // Calculate average brightness
          const avgBrightness = calculateAverageBrightness(imageData);
          const percentage = (avgBrightness / 255) * 100;

          if (percentage < 15) console.log(`Lighting: ${percentage} %`);

          let src: any = null;
          let corners: any = null;

          try {
            src = window.cv.matFromImageData(imageData);
            const { corners: detectedCorners, count } = detectCardCorners(src);
            corners = detectedCorners;

            // Update area state with corner detection results
            const isCornerDetected = count === 4; // We want exactly 4 corners
            setAreas((prev) =>
              prev.map((a) =>
                a.id === area.id
                  ? { ...a, isCornerDetected, cornerCount: count }
                  : a
              )
            );

            // Draw detected corners
            if (corners && corners.rows > 0) {
              for (let i = 0; i < corners.rows; i++) {
                const x = corners.data32F[i * 2] + area.x;
                const y = corners.data32F[i * 2 + 1] + area.y;

                // Draw corner point
                context.beginPath();
                context.arc(x, y, 3, 0, 2 * Math.PI);
                context.fillStyle = "#00FF00";
                context.fill();

                // Draw corner number
                context.font = "12px Arial";
                context.fillStyle = "#00FF00";
                context.fillText(`${i + 1}`, x + 5, y + 5);
              }
            }

            // Draw detection status
            if (isCornerDetected) {
              context.strokeStyle = "#00FF00";
              context.lineWidth = 3;
              context.setLineDash([5, 5]);
              context.strokeRect(
                area.x - 2,
                area.y - 2,
                area.width + 4,
                area.height + 4
              );
              context.setLineDash([]);
            }

            // Draw corner count
            context.font = "12px Arial";
            context.fillStyle = isCornerDetected ? "green" : "red";
            context.fillText(`Corners: ${count}/4`, area.x, area.y - 5);

            detectCardCornerAll = [...detectCardCornerAll, count];
          } finally {
            if (src) src.delete();
            if (corners) corners.delete();
          }
        } catch (areaError) {
          console.error(`Error processing area ${area.id}:`, areaError);
        }
      });

      // console.log({ detectCardCornerAll });
      if (
        detectCardCornerAll.length > 0 &&
        detectCardCornerAll.every((value) => value >= 5)
      ) {
        console.log({ detectCardCornerAll });
        // console.log("--Detected--");
        setIsScanning(true);
        if (!isProcessing) {
          // console.log("-- process --");
          isProcessing = true;
          setTimeout(() => {
            // Convert canvas to image data URL
            if (!canvasRef.current) {
              return;
            }
            const currentCanvas = canvasRef.current;
            const currentImageDataUrl = currentCanvas.toDataURL("image/png");
            setResultImage(currentImageDataUrl);
            setIsStreaming(false);
            setIsScanning(false);
            isProcessing = false;
          }, 2000);
        }
      }

      requestAnimationFrame(analyzeFrame);
    } catch (error) {
      console.error("Error in analyzeFrame:", error);
      requestAnimationFrame(analyzeFrame);
    }
  };

  const getIdCoordinates = (sensorItem: string) => {
    const element = document.getElementById(sensorItem);
    if (element) {
      const rect = element.getBoundingClientRect();

      const x = rect.left; // X coordinate relative to viewport
      const y = rect.top; // Y coordinate relative to viewport

      // If you need coordinates relative to the whole document (including scroll)
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      const absoluteX = rect.left + scrollX;
      const absoluteY = rect.top + scrollY;

      return { x: absoluteX, y: absoluteY };
    }
    return { x: 0, y: 0 };
  };

  const getSensorCoordinates = (): void => {
    const sencerIdList = [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
    ];

    let newAreas = [...areas];
    sencerIdList.forEach((sensorItem, index) => {
      const { x, y } = getIdCoordinates(sensorItem);

      switch (index) {
        case 0:
          newAreas[index].x = x;
          newAreas[index].y = y;
          break;
        case 1:
          newAreas[index].x = x - 35;
          newAreas[index].y = y;
          break;
        case 2:
          newAreas[index].x = x;
          newAreas[index].y = y - 35;
          break;
        case 3:
          newAreas[index].x = x - 35;
          newAreas[index].y = y - 35;
          break;
      }
    });
    setAreas(newAreas);
  };

  useEffect(() => {
    if (isStreaming) {
      console.log("isStreaming", isStreaming)
      analyzeFrame();
    }
  }, [isStreaming, sensitivity, minThreshold, maxThreshold]);

  const handleScan = () => {
    setIsScanning(true);
  };

  const handleClearImage = (): void => {
    setResultImage("");
    setIsStreaming(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Meta viewport tag is required in your HTML file:
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/> */}
      <Container
        sx={{
          minHeight: window.innerHeight,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "rgba(255,255,255,1)",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {!isStreaming && !resultImage && isAllowCamera ? (
          <CardScannerLoader />
        ) : !isAllowCamera ? (
          <CardScannerAllowCamera />
        ) : (
          <>
            {/* Video Area */}
            <Box
              sx={{
                position: "absolute",
                width: "-webkit-fill-available",
                height: "-webkit-fill-available",
                zIndex: 1,
                top: 0,
                left: 0,
              }}
            >
              {!resultImage && (
                <>
                  <div style={{ position: "absolute" }}>
                    <canvas
                      ref={canvasRef}
                      width={window.innerWidth}
                      height={
                        (window.innerWidth *
                          (videoRef.current?.videoHeight || 0)) /
                        (videoRef.current?.videoWidth || 0)
                      }
                    />
                  </div>
                </>
              )}

              <video
                ref={videoRef}
                className="none"
                autoPlay
                playsInline
                onPlay={() => setIsStreaming(true)}
                style={{
                  display: !resultImage ? "block" : "none",
                  height: "-webkit-fill-available",
                  width: "100%",
                }}
              />
            </Box>

            {!resultImage && <FrameCardScanner isBlink={isScanning} />}

            {/* Overlay Area */}
            <Box
              sx={{
                minHeight: window.innerHeight,
                width: "-webkit-fill-available",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                px: isMobile ? 2 : 3,
                zIndex: 2,
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <Box
                sx={{
                  py: isMobile ? 3 : 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: window.innerHeight,
                  justifyContent: "space-between",
                  // paddingBottom: isMobile ? "100px" : 0,
                }}
              >
                {/* Header */}
                <Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      color: resultImage ? "primary.main" : "secondary.light",
                      fontWeight: "bold",
                      mb: isMobile ? 2 : 3,
                      textAlign: "center",
                    }}
                  >
                    แสกนบัตร
                  </Typography>

                  {/* Security Message */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: isMobile ? 2 : 3,
                    }}
                  >
                    <SecurityIcon
                      color="primary"
                      sx={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }}
                    />
                    <Typography
                      variant="body1"
                      color={resultImage ? "secondary.dark" : "secondary.light"}
                    >
                      รูปภาพบัตรของคุณจะไม่ถูกบันทึก
                    </Typography>
                  </Box>
                </Box>

                {/* Instruction Text */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: "60px",
                  }}
                >
                  <Typography
                    variant="body1"
                    color={resultImage ? "secondary.main" : "secondary.light"}
                    textAlign="center"
                    sx={{ mb: isMobile ? 2 : 3, px: 2 }}
                  >
                    วางบัตรของคุณให้ตรงกับกรอบในรูป แล้วค้างไว้ระยะหนึ่ง
                  </Typography>

                  {resultImage ? (
                    <div>
                      <img
                        src={resultImage}
                        style={{
                          height: `${(window.innerWidth * 0.8 * 2) / 3}px`,
                          width: "80%",
                          objectFit: "cover",
                          // clipPath: "inset(25% 0 45% 0)",
                        }}
                        onClick={() => handleClearImage()}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        height: (window.innerWidth * 0.8 * 2) / 3,
                        width: "80%",
                      }}
                    ></div>
                  )}

                  {/* Scan Instructions */}
                  <Typography
                    variant="body2"
                    color={resultImage ? "secondary.main" : "secondary.light"}
                    sx={{ mb: isMobile ? 3 : 4, textAlign: "center" }}
                  >
                    กดที่รูปหากต้องการสแกนใหม่
                  </Typography>
                </Box>

                {/* Button Container - Fixed at bottom for mobile */}
                <Box
                  sx={{
                    width: "100%",
                    px: isMobile ? 0 : 2,
                  }}
                >
                  <ButtonStyled variant="outlined" color="primary">
                    กรอกข้อมูลด้วยตัวเอง
                  </ButtonStyled>

                  <ButtonStyled
                    variant="contained"
                    color="primary"
                    sx={{ mb: 0 }}
                  >
                    ยืนยัน
                  </ButtonStyled>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CardScanner;