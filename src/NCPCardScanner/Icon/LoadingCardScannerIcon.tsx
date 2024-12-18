import React from "react";

const LoadingCardScannerIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      width={props.width || 79}
      height={props.height || 79}
      color={props.color || "#73c23a"}
      style={{ borderRadius: "50%", }}
    >

      <defs>
        <linearGradient id="spinner-secondHalf" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffffff">
          </stop>
          <stop offset="100%" stop-color="#ffffff">
          </stop>
        </linearGradient>
        <linearGradient id="spinner-firstHalf" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#3F968B">
          </stop>
          <stop offset="25%" stop-color="#3F968B">
          </stop>
          <stop offset="60%" stop-color="#E0EFEE">
          </stop>
          <stop offset="75%" stop-color="#E0EFEE">
          </stop>
          <stop offset="92%" stop-color="#ffffff">
          </stop>
        </linearGradient>
      </defs>

      <g stroke-width="50">
        <path
          stroke="url(#spinner-secondHalf)"
          stroke-width="50"
          d="M 4 100 A 96 96 0 0 1 196 101"

        />
        <path
          stroke="url(#spinner-firstHalf)"
          stroke-width="50"
          d="M 196 100 A 96 96 0 0 1 4 98"
        />
        <path
          stroke="#3F968B"
          stroke-width="30"
          stroke-linecap="round"
          d="M 14 100 A 96 96 0 0 1 14 98"
        />
      </g>

      <animateTransform
        from="0 0 0"
        to="360 0 0"
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1500ms"
      />
    </svg>
  )
};

export default LoadingCardScannerIcon;
