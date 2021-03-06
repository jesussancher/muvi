import * as React from "react";

const MuviLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 379 105.49"
    width={props.width ? props.width : '120'}
    {...props}
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        x1={1352.85}
        y1={52.74}
        x2={1731.85}
        y2={52.74}
        gradientTransform="translate(-1352.85)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#8bcda3" />
        <stop offset={1} stopColor="#02b4e4" />
      </linearGradient>
    </defs>
    <g id="Layer_1" data-name="Layer 1">
      <path
        d="M234.61,0a10.26,10.26,0,0,0-10.26,10.26V59.09q0,16.32-4.68,22.8t-16.39,6.47h-1q-11.72,0-16.39-6.47t-4.68-22.8V10.26a10.26,10.26,0,1,0-20.51,0V59.39q0,19.5,4.23,27.9a31.71,31.71,0,0,0,12.51,13.29,34.85,34.85,0,0,0,18.08,4.91H210a34.91,34.91,0,0,0,18.09-4.91,31.83,31.83,0,0,0,12.51-13.29q4.22-8.4,4.22-27.9V10.26A10.25,10.25,0,0,0,234.61,0ZM131.2,4.9A34.84,34.84,0,0,0,113.12,0H98.62A34.9,34.9,0,0,0,80.53,4.9,33.17,33.17,0,0,0,74,10,33.17,33.17,0,0,0,67.41,4.9,34.85,34.85,0,0,0,49.32,0H34.82A34.84,34.84,0,0,0,16.74,4.9,31.73,31.73,0,0,0,4.23,18.2Q0,26.6,0,46.09V95.23a10.26,10.26,0,1,0,20.51,0V46.4q0-16.33,4.68-22.8t16.4-6.47h1q11.71,0,16.4,6.47t4.67,22.8V95.23a10.26,10.26,0,0,0,10.26,10.26h.16A10.26,10.26,0,0,0,84.31,95.23V46.4q0-16.33,4.68-22.8t16.39-6.47h1q11.72,0,16.39,6.47t4.68,22.8V95.23a10.26,10.26,0,1,0,20.51,0V46.09q0-19.49-4.23-27.89A31.73,31.73,0,0,0,131.2,4.9ZM368.74,0a10.25,10.25,0,0,0-10.25,10.26V93.43a10.26,10.26,0,0,0,20.51,0V10.26A10.26,10.26,0,0,0,368.74,0ZM334.57,0a10.17,10.17,0,0,0-9.36,6.21L300.88,63.79,275.58,6.13A10.23,10.23,0,0,0,266.2,0h0a10.24,10.24,0,0,0-9.36,14.4l39.09,87.93a5.31,5.31,0,0,0,9.73,0L343.9,14.22A10.17,10.17,0,0,0,334.57,0Z"
        style={{
          fill: "url(#linear-gradient)",
        }}
      />
    </g>
  </svg>
);

export default MuviLogo;