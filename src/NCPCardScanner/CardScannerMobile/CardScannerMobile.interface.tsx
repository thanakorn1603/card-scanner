export interface Props {
  isMobile: boolean;
  resultImage: string | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  setIsStreaming: (isStreaming: boolean) => void;
  isScanning: boolean;
  handleClearImage: () => void;
}
