import React, { HTMLAttributes } from "react";
import "./NCPCardScannerAllowCamera.css";

interface NCPCardScannerAllowCameraProps extends HTMLAttributes<HTMLDivElement> {
  titleLabel?: string;
  subTitleLabel?: string;
}

const NCPCardScannerAllowCamera: React.FC<NCPCardScannerAllowCameraProps> = ({
  titleLabel = "อนุญาติการเข้าถึงกล้อง",
  subTitleLabel = "เพื่อให้สามารถ สแกนบัตรประชาชนได้ กรุณานุญาตการเข้าถึงกล้อง",
  ...res
}) => {
  return (
    <div
      className="NCPCardScannerAllowCameraSpinnerContainer"
      {...res}
    >
      <label className="titleLabel">{titleLabel}</label>
      <label className="subTitleLabel">{subTitleLabel}</label>
    </div>
  );
};

export default NCPCardScannerAllowCamera;
