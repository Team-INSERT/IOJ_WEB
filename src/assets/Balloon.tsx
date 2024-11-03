interface BalloonProps {
  width?: number;
}

const Balloon = ({ width = 368, ...props }: BalloonProps) => {
  const height = width - 15;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 368 353"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_i_4824_4560)">
        <path
          d="M367.121 173.872C372.422 273.1 296.535 352.524 195.237 352.524C73.1363 352.523 5.58855 273.1 0.287961 173.872C-5.01262 74.6444 96.785 0 198.083 0C299.381 0 361.82 74.6444 367.121 173.872Z"
          fill="url(#paint0_linear_4824_4560)"
          fillOpacity="0.6"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_4824_4560"
          x="0.0895386"
          y="0"
          width="367.293"
          height="386.523"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="34" />
          <feGaussianBlur stdDeviation="17" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_4824_4560"
          />
        </filter>
        <linearGradient
          id="paint0_linear_4824_4560"
          x1="53.8384"
          y1="74.5115"
          x2="306.071"
          y2="321.554"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60D9F3" />
          <stop offset="1" stopColor="#5236FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Balloon;
