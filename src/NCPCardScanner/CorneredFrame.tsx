import { styled } from "@mui/material";

// Frame Container
const FrameContainer = styled('div')({
    position: "absolute",
    aspectRatio: "3 / 2",
    transform: "translate(-50%, -50%)",
    left: "50%",
    top: "50%",
    backgroundColor: "transparent",
    zIndex: 3,
    width: "80%",
    outline: "300px solid  rgba(68, 68, 68,0.5)"
});

// Corner component
const Corner = styled('div')({
  position: 'absolute',
  width: '40px',
  height: '40px',

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
});

// Main Component
const CornerFrame = () => {
  return (
    <FrameContainer>
      <Corner data-position="top-left" />
      <Corner data-position="top-right" />
      <Corner data-position="bottom-left" />
      <Corner data-position="bottom-right" />
    </FrameContainer>
  );
};

export default CornerFrame;