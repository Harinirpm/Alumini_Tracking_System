import * as React from "react";
const Hifavicon = (props) => (
  <svg
    width={49}
    height={55}
    viewBox="0 0 49 55"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <rect
      width={38}
      height={47}
      transform="matrix(-0.969091 0.246703 0.246703 0.969091 36.8255 0)"
      fill="url(#pattern0_601_49)"
    />
    <defs>
      <pattern
        id="pattern0_601_49"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use
          xlinkHref="#image0_601_49"
          transform="matrix(0.0111111 0 0 0.00898345 0 0.0957447)"
        />
      </pattern>
      <image
        id="image0_601_49"
        width={90}
        height={90}
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
export default Hifavicon;
