import { styled, keyframes } from "@mui/material";

// Add blinking animation keyframes
const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

// Frame Container remains the same
const FrameContainer = styled('div')({
    position: "absolute",
    aspectRatio: "3 / 2",
    transform: "translate(-50%, -50%)",
    left: "50%",
    top: "50%",
    backgroundColor: "transparent",
    zIndex: 3,
    width: "80%",
    outline: "500px solid  rgba(68, 68, 68,0.5)"
});

// Define interface for Corner props
interface CornerProps {
    isBlink?: boolean;
  }

// Modified Corner component with blink animation
const Corner = styled('div')<CornerProps>(({ isBlink }) => ({
  position: 'absolute',
  width: '40px',
  height: '40px',
  animation: isBlink ? `${blinkAnimation} 1s infinite` : 'none',

  // Top Left
  '&[data-position="top-left"]': {
    top: "-5px",
    left: "-5px",
    borderTop: '8px solid #A5C15F',
    borderLeft: '8px solid #A5C15F',
    borderTopLeftRadius: '12px',
  },

  // Top Right
  '&[data-position="top-right"]': {
    top: "-5px",
    right: "-5px",
    borderTop: '8px solid #A5C15F',
    borderRight: '8px solid #A5C15F',
    borderTopRightRadius: '12px',
  },

  // Bottom Left
  '&[data-position="bottom-left"]': {
    bottom: "-5px",
    left: "-5px",
    borderBottom: '8px solid #A5C15F',
    borderLeft: '8px solid #A5C15F',
    borderBottomLeftRadius: '12px',
  },

  // Bottom Right
  '&[data-position="bottom-right"]': {
    bottom: "-5px",
    right: "-5px",
    borderBottom: '8px solid #A5C15F',
    borderRight: '8px solid #A5C15F',
    borderBottomRightRadius: '12px',
  },
}));

// Modified Main Component to accept isBlink prop
const CornerFrame = ({ isBlink = false }) => {
  return (
    <FrameContainer>
      <Corner data-position="top-left" id="top-left" isBlink={isBlink}/>
      <Corner data-position="top-right" id="top-right" isBlink={isBlink}/>
      <Corner data-position="bottom-left" id="bottom-left" isBlink={isBlink}/>
      <Corner data-position="bottom-right" id="bottom-right" isBlink={isBlink}/>
    </FrameContainer>
  );
};

export default CornerFrame;