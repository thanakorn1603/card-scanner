import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import FrameCardScanner from "../FrameCardScanner/FrameCardScanner";
import { Props } from "./CardScannerMobile.interface";
import {
  ButtonsContainerStyled,
  ButtonStyledContained,
  ButtonStyledOutlined,
  CanvasStyled,
  InstructionsStyled,
  InstructionTextStyled,
  OverlayAreaInsideStyled,
  OverlayAreaStyled,
  ResultImageStyled,
  ScanInstructionsStyled,
  SecurityIconStyled,
  SecurityMessageStyled,
  TitleScannerStyled,
  TitleSecurityMessageStyled,
  VideoAreaStyled,
  VideoStyled
} from "./CardScannerMobile.styles";

const CardScannerMobile: React.FC<Props> = ({
  isMobile,
  resultImage,
  canvasRef,
  videoRef,
  setIsStreaming,
  isScanning,
  handleClearImage,
}) => {
  const [videoHeight, setVideoHeight] = useState<number>(
    (window.innerWidth *
      (videoRef.current?.videoHeight || 0)) /
    (videoRef.current?.videoWidth || 1)
  );

  useEffect(() => {
    const calculateVideoHeight = () => {
      if (videoRef.current) {
        const newHeight =
          (window.innerWidth *
            (videoRef.current.videoHeight || 0)) /
          (videoRef.current.videoWidth || 1);
        setVideoHeight(newHeight);
      }
    };

    calculateVideoHeight();
    window.addEventListener("resize", calculateVideoHeight);

    return () => {
      window.removeEventListener("resize", calculateVideoHeight);
    };
  }, [videoRef]);
  return (
    <>
      {/* Video Area */}
      <VideoAreaStyled>
        {!resultImage && (
          <CanvasStyled>
            <canvas
              ref={canvasRef}
              width={window.innerWidth}
              height={
                (window.innerWidth *
                  (videoRef.current?.videoHeight || 0)) /
                (videoRef.current?.videoWidth || 0)
              }
            />
          </CanvasStyled>
        )}

        <VideoStyled
          ref={videoRef}
          className="none"
          autoPlay
          playsInline
          onPlay={() => setIsStreaming(true)}
          resultImage={resultImage}
        />

      </VideoAreaStyled>

      {!resultImage && <FrameCardScanner isBlink={isScanning} />}

      {/* Overlay Area */}
      <OverlayAreaStyled>
        <OverlayAreaInsideStyled>
          <Box>
            <TitleScannerStyled
              resultImage={resultImage}
              variant="h4"
              component="h1"
            >
              แสกนบัตร
            </TitleScannerStyled>

            <SecurityMessageStyled>
              <SecurityIconStyled color="primary" />
              <TitleSecurityMessageStyled
                resultImage={resultImage}
                variant="body1"
              >
                รูปภาพบัตรของคุณจะไม่ถูกบันทึก
              </TitleSecurityMessageStyled>
            </SecurityMessageStyled>
          </Box>

          <InstructionsStyled>
            <InstructionTextStyled
              resultImage={resultImage}
              variant="body1"
            >
              วางบัตรของคุณให้ตรงกับกรอบในรูป แล้วค้างไว้ระยะหนึ่ง
            </InstructionTextStyled>

            <ResultImageStyled
              src={resultImage}
              onClick={handleClearImage}
              resultImage={resultImage}
            />

            {resultImage &&
              <ScanInstructionsStyled
                resultImage={resultImage}
                variant="body2"
              >
                กดที่รูปหากต้องการสแกนใหม่
              </ScanInstructionsStyled>
            }
          </InstructionsStyled>

          <ButtonsContainerStyled>
            <ButtonStyledOutlined
              variant="outlined"
              color="primary"
              fullWidth
            >
              กรอกข้อมูลด้วยตัวเอง
            </ButtonStyledOutlined>
            <ButtonStyledContained
              variant="contained"
              color="primary"
              fullWidth
            >
              ยืนยัน
            </ButtonStyledContained>
          </ButtonsContainerStyled>

        </OverlayAreaInsideStyled>
      </OverlayAreaStyled>
    </>
  );
};

export default CardScannerMobile;
