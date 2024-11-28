import { Box, Button, Grid, Typography } from "@mui/material";
// import { Theme } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";

import "./NCPCardScanner.css";
import NCPCardScannerAllowCamera from "./NCPCardScannerAllowCamera";
import NCPCardScannerLoader from "./NCPCardScannerLoader";

interface Area {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  isCornerDetected: boolean;
  cornerCount: number;
}

declare global {
  interface Window {
    cv: any;
  }
}

let isLoadCV = false;

const NCPCardScanner: React.FC = () => {
  // const isMobile = useMediaQuery((theme: Theme) =>
  //   theme.breakpoints.down("sm"),
  // );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [areas, setAreas] = useState<Area[]>([
    {
      id: 1,
      x: 130,
      y: 70,
      width: 70,
      height: 70,
      isCornerDetected: false,
      cornerCount: 0,
    },
    {
      id: 2,
      x: 440,
      y: 70,
      width: 70,
      height: 70,
      isCornerDetected: false,
      cornerCount: 0,
    },
    {
      id: 3,
      x: 130,
      y: 244,
      width: 70,
      height: 70,
      isCornerDetected: false,
      cornerCount: 0,
    },
    {
      id: 4,
      x: 440,
      y: 244,
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
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "environment", // Use back camera if available
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
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
        window.cv.NORM_MINMAX,
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
        dilated, // Use dilated edges as mask
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

  const analyzeFrame = (): void => {
    try {
      if (!isStreaming || !window.cv || !canvasRef.current || !videoRef.current)
        return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) return;

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
            area.height,
          );

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
                  : a,
              ),
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
                area.height + 4,
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

      if (
        detectCardCornerAll.length > 0 &&
        detectCardCornerAll.every((value) => value >= 5)
      ) {
        console.log({ detectCardCornerAll });
        console.log("--Detected--");
        setIsScanning(true);
        if (!isProcessing) {
          console.log("-- process --");
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

  useEffect(() => {
    if (isStreaming) {
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
    <Box sx={{ width: "100%", maxWidth: 640, mx: "auto", p: 2 }}>
      {/* Header */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center">
        <Grid item>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              color: "text.primary",
              textAlign: "center",
              fontWeight: 500,
              fontSize: "24px",
            }}>
            แสกนบัตร
          </Typography>
        </Grid>
      </Grid>

      {/* Subheader with icon */}
      <Box sx={{ mt: 2, mb: 3, textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", fontSize: "24px", paddingBottom: 10 }}>
          รูปภาพบัตรของคุณจะไม่ถูกบันทึก
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            fontSize: "24px",
          }}>
          วางบัตรของคุณให้ตรงกับกรอบในรูป แล้วค้างไว้ระยะหนึ่ง
        </Typography>
      </Box>

      {/* Scanner Area */}
      <Box
        className="thaiIdDetector"
        sx={{
          width: "100%",
          height: 384,
          bgcolor: "grey.100",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          position: "relative",
          overflow: "hidden",
        }}>
        <div className="innerWrap">
          {!isStreaming && !resultImage && isAllowCamera ? (
            <NCPCardScannerLoader />
          ) : !isAllowCamera ? (
            <NCPCardScannerAllowCamera />
          ) : (
            (isStreaming || !resultImage) && (
              <div className={`borderFrame ${isScanning && "isScanning"}`}>
                <div className="borderCardIdContainerWrap" />
                <div className="containerCamera">
                  <div className="borderCardIdContainer">
                    <div className="borderCardIdInContainer">
                      <div className="borderCardId">
                        <div className="borderInCardId">
                          <div className="borderCardIdAvatarContainer">
                            <div className="borderHeadCardId" />
                            <div className="borderBodyCardId" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          <video
            ref={videoRef}
            className="hidden"
            autoPlay
            playsInline
            onPlay={() => setIsStreaming(true)}
            width="640"
            height="384"
            style={{ display: "none" }}
          />

          {resultImage ? (
            <div>
              <img
                src={resultImage}
                style={{ height: "384px" }}
                onClick={() => handleClearImage()}
              />
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              width="640"
              height="384"
              style={{ height: "384px" }}
              className="w-full border border-gray-200 rounded"
            />
          )}
        </div>
        {/* {isScanning && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              bgcolor: "primary.main",
              zIndex: 99,
              animation: "scan 1s linear infinite",
            }}
          />
        )} */}
      </Box>

      {/* Instructions */}
      <Box sx={{ marginBottom: "10px" }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            mb: 3,
            fontSize: "24px",
            fontWeight: 400,
            paddingBottom: "10px",
          }}>
          กดที่รูปหากต้องการถ่ายรูปใหม่
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Grid
        container
        spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {}}
            sx={{
              borderColor: "#73C23A",
              fontSize: "24px",
              color: "#73C23A",
              "&:hover": {
                borderColor: "success.dark",
              },
            }}>
            กรอกข้อมูลด้วยตัวเอง
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleScan}
            sx={{
              color: "white",
              fontSize: "24px",
              bgcolor: "#73C23A",
              "&:hover": {
                bgcolor: "#73C23A",
              },
            }}>
            ยืนยัน
          </Button>
        </Grid>
      </Grid>

      {/* Animation styles */}
      <style>
        {`
          @keyframes scan {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(384px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default NCPCardScanner;
