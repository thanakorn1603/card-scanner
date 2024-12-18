import React from "react";
import { CardScannerAllowCameraSpinnerContainerStyled } from "./CardScannerAllowCamera.styles"
import { CardScannerAllowCameraProps } from "./CardScannerAllowCamera.interface"

const CardScannerAllowCamera: React.FC<CardScannerAllowCameraProps> = ({
  titleLabel = "อนุญาติการเข้าถึงกล้อง",
  subTitleLabel = "เพื่อให้สามารถ สแกนบัตรประชาชนได้ กรุณานุญาตการเข้าถึงกล้อง",
  ...res
}) => {
  return (
    <CardScannerAllowCameraSpinnerContainerStyled
      {...res}>
      <label className="titleLabel">{titleLabel}</label>
      <label className="subTitleLabel">{subTitleLabel}</label>
    </CardScannerAllowCameraSpinnerContainerStyled>
  );
};

export default CardScannerAllowCamera;
