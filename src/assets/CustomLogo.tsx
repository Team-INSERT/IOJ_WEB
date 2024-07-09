import { SVGProps } from "react";

const CustomLogo = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28.5 20.25H34.5"
        stroke="#4D4D4D"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 20.25H19.5"
        stroke="#4D4D4D"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.5 17.25V23.25"
        stroke="#4D4D4D"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M32.2501 10.4437L15.7501 10.5C13.4584 10.5043 11.2411 11.3143 9.48618 12.7882C7.73125 14.262 6.55037 16.306 6.15009 18.5625V18.5625L3.07509 34.3312C2.87765 35.4324 3.03713 36.5678 3.53027 37.572C4.02342 38.5762 4.82445 39.3966 5.81656 39.9136C6.80867 40.4306 7.93999 40.6171 9.04556 40.446C10.1511 40.2749 11.1731 39.7552 11.9626 38.9625V38.9625L20.0626 30L32.2501 29.9437C34.836 29.9437 37.3159 28.9165 39.1444 27.088C40.9729 25.2595 42.0001 22.7796 42.0001 20.1937C42.0001 17.6079 40.9729 15.1279 39.1444 13.2994C37.3159 11.471 34.836 10.4437 32.2501 10.4437V10.4437Z"
        stroke="#4D4D4D"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M41.85 18.5062L44.925 34.3312C45.1224 35.4324 44.963 36.5678 44.4698 37.572C43.9767 38.5762 43.1756 39.3966 42.1835 39.9136C41.1914 40.4306 40.0601 40.6171 38.9545 40.446C37.849 40.2749 36.8269 39.7552 36.0375 38.9625V38.9625L27.9375 29.9625"
        stroke="#4D4D4D"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CustomLogo;
