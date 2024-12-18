export interface Area {
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
