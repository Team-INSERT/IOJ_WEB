import { SVGProps } from "react";

const GithubLogo = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.3333 1.66695C15.5224 1.61807 10.889 3.4813 7.45122 6.84716C4.01348 10.213 2.05277 14.8061 2 19.617C2.01854 23.4189 3.24157 27.1172 5.49344 30.1805C7.7453 33.2439 10.9101 35.5148 14.5333 36.667C15.45 36.8336 15.7833 36.2836 15.7833 35.8003C15.7833 35.317 15.7833 34.2503 15.7833 32.7503C10.6833 33.8336 9.6 30.3503 9.6 30.3503C9.26049 29.2568 8.53872 28.322 7.56667 27.717C5.9 26.617 7.7 26.6336 7.7 26.6336C8.27609 26.7106 8.82726 26.9171 9.31218 27.2375C9.79711 27.5579 10.2032 27.9839 10.5 28.4836C11.0172 29.3805 11.8659 30.0384 12.8634 30.3159C13.8608 30.5933 14.9273 30.468 15.8333 29.967C15.9265 29.0543 16.3398 28.204 17 27.567C12.9333 27.117 8.66667 25.5836 8.66667 18.7003C8.6303 16.9048 9.29374 15.1655 10.5167 13.8503C9.95971 12.3087 10.0255 10.6108 10.7 9.11695C10.7 9.11695 12.25 8.63362 15.7 10.9503C18.7032 10.15 21.8635 10.15 24.8667 10.9503C28.3667 8.63362 29.8667 9.11695 29.8667 9.11695C30.5412 10.6108 30.607 12.3087 30.05 13.8503C31.3013 15.1414 32.0008 16.869 32 18.667C32 25.567 27.7 27.0836 23.6667 27.5336C24.1083 27.9624 24.4495 28.4837 24.6656 29.0601C24.8817 29.6364 24.9675 30.2535 24.9167 30.867V35.7836C24.9167 35.7836 25.25 36.8336 26.1667 36.6503C29.7796 35.491 32.9338 33.2196 35.1787 30.1605C37.4236 27.1015 38.6443 23.4113 38.6667 19.617C38.6139 14.8061 36.6532 10.213 33.2154 6.84716C29.7777 3.4813 25.1442 1.61807 20.3333 1.66695Z"
      fill="white"
    />
  </svg>
);

export default GithubLogo;
