import React from "react";

function Monitor(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 32}
      height={props.width || 32}
      fill="none"
      viewBox="0 0 44 44"
      {...props}
    >
      <rect width="44" height="44" fill="#252525" rx="10"></rect>
      <path
        fill="#fff"
        d="M27.56 12H16.41C13.98 12 12 13.98 12 16.41v6.7a4.41 4.41 0 004.41 4.41h3.84c.55 0 1 .45 1 1v.97c0 .55-.45 1-1 1h-2.42a.755.755 0 000 1.51h8.35c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-2.42c-.55 0-1-.45-1-1v-.97c0-.55.45-1 1-1h3.81a4.41 4.41 0 004.41-4.41v-6.7c-.01-2.44-1.99-4.42-4.42-4.42z"
      ></path>
    </svg>
  );
}

export default Monitor;