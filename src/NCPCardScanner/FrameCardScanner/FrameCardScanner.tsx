import React from "react";
import { Props } from "./FrameCardScanner.interface";
import { AvatarCardIconStyled, CornerStyled, FrameCardScannerStyled, FrameContainerStyled, FrameInContainerStyled } from "./FrameCardScanner.style";
import AvatarCardIcon from "../Icon/AvatarCardIcon";

const FrameCardScanner: React.FC<Props> = ({ isBlink = false }) => {

  return (
    <FrameCardScannerStyled>
      <FrameContainerStyled>
        <FrameInContainerStyled>
          <AvatarCardIconStyled>
            <AvatarCardIcon />
          </AvatarCardIconStyled>
          <CornerStyled data-position="top-left" id="top-left" isBlink={isBlink} />
          <CornerStyled data-position="top-right" id="top-right" isBlink={isBlink} />
          <CornerStyled data-position="bottom-left" id="bottom-left" isBlink={isBlink} />
          <CornerStyled data-position="bottom-right" id="bottom-right" isBlink={isBlink} />
        </FrameInContainerStyled>
      </FrameContainerStyled>
    </FrameCardScannerStyled>
  );
};

export default FrameCardScanner;
