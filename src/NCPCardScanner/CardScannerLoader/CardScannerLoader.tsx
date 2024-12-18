import React, { HTMLAttributes } from "react";
import { CardScannerLoaderSpinnerContainerStyled } from "./CardScannerLoader.styles"
import LoadingCardScannerIcon from "../Icon/LoadingCardScannerIcon";

const CardScannerLoader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  ...res
}) => {
  return (
    <CardScannerLoaderSpinnerContainerStyled
      {...res}>
      <LoadingCardScannerIcon />
    </CardScannerLoaderSpinnerContainerStyled>
  );
};

export default CardScannerLoader;
