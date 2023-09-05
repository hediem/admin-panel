import React from "react";

const AnalysisCard = ({ number, text }: { number: number; text: string }) => {
  return (
    <div className="detail-card col-6 col-lg-3">
      <div className="number">{number}</div>
      <div className="text">{text}</div>
      <div className="corner-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="74"
          height="96"
          viewBox="0 0 74 96"
          fill="none"
          className="small-screen-svg"
        >
          <g clip-path="url(#clip0_440_39905)">
            <circle opacity="0.3" cx="71.5" cy="24.5" r="71.5" fill="#D0E4FF" />
            <ellipse
              opacity="0.3"
              cx="70.5"
              cy="24.5"
              rx="46.5"
              ry="47.5"
              fill="#CEE3FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_440_39905">
              <rect width="74" height="96" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="168"
          viewBox="0 0 128 168"
          fill="none"
          className="large-screen-svg"
        >
          <g clip-path="url(#clip0_440_39022)">
            <circle opacity="0.3" cx="117" cy="84" r="117" fill="#E5F0FF" />
            <circle
              opacity="0.3"
              cx="117.5"
              cy="83.5"
              r="83.5"
              fill="#E5F0FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_440_39022">
              <rect width="128" height="168" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AnalysisCard;
