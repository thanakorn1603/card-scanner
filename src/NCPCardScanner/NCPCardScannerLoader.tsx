import React, { HTMLAttributes } from "react";
import "./NCPCardScannerLoader.css";
import LoadingNCPCardScanner from "./LoadingNCPCardScanner";

interface NCPCardScannerLoaderProps extends HTMLAttributes<HTMLDivElement> { }

const NCPCardScannerLoader: React.FC<NCPCardScannerLoaderProps> = ({ ...res }) => {
  return (
    <div
      className="ncpCardScannerLoaderSpinnerContainer"
      {...res}
    >
      <LoadingNCPCardScanner />
    </div>
  );
};

export default NCPCardScannerLoader;
