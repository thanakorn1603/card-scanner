import { HTMLAttributes } from "react";

export interface CardScannerAllowCameraProps extends HTMLAttributes<HTMLDivElement> {
    titleLabel?: string;
    subTitleLabel?: string;
}