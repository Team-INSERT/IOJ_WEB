interface BalloonProps {
  width?: number;
}

const Balloon = ({ width = 368, ...props }: BalloonProps) => {
  const height = width - 15;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 386 353"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_i_5197_1248)">
        <path
          d="M376.121 173.872C381.422 273.1 305.535 352.524 204.237 352.524C82.1363 352.523 14.5885 273.1 9.28796 173.872C3.98738 74.6444 105.785 0 207.083 0C308.381 0 370.82 74.6444 376.121 173.872Z"
          fill="url(#paint0_linear_5197_1248)"
          fillOpacity="0.6"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.6196 110.118L32.4961 113.644C37.8354 96.9873 47.6917 81.5221 60.4951 68.8472L54.7856 65.4214C42.1491 78.2253 32.3033 93.589 26.6196 110.118Z"
        fill="url(#paint1_linear_5197_1248)"
        fillOpacity="0.78"
      />
      <defs>
        <filter
          id="filter0_i_5197_1248"
          x="9.08954"
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
            result="effect1_innerShadow_5197_1248"
          />
        </filter>
        <linearGradient
          id="paint0_linear_5197_1248"
          x1="62.8384"
          y1="74.5115"
          x2="315.071"
          y2="321.554"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60D9F3" />
          <stop offset="1" stopColor="#5236FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_5197_1248"
          x1="25.8281"
          y1="78.9526"
          x2="62.8448"
          y2="99.8607"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF5F5" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Balloon;
