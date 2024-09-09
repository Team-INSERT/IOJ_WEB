import { SVGProps } from "react";

interface ColoredStarProps extends SVGProps<SVGSVGElement> {
  color: string;
}

const Star = ({ color, ...props }: ColoredStarProps) => {
  const { width = "28", height = "28" } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.0489 2.92705C13.3483 2.00574 14.6517 2.00574 14.9511 2.92705L16.9187 8.98278C17.0526 9.3948 17.4365 9.67376 17.8697 9.67376H24.2371C25.2058 9.67376 25.6086 10.9134 24.8249 11.4828L19.6736 15.2254C19.3231 15.4801 19.1764 15.9314 19.3103 16.3435L21.2779 22.3992C21.5773 23.3205 20.5228 24.0866 19.7391 23.5172L14.5878 19.7746C14.2373 19.5199 13.7627 19.5199 13.4122 19.7746L8.2609 23.5172C7.47719 24.0866 6.42271 23.3205 6.72206 22.3992L8.68969 16.3435C8.82356 15.9314 8.6769 15.4801 8.32642 15.2254L3.17511 11.4828C2.39139 10.9134 2.79417 9.67376 3.76289 9.67376H10.1303C10.5635 9.67376 10.9474 9.3948 11.0813 8.98278L13.0489 2.92705Z"
        fill={color}
      />
    </svg>
  );
};

export default Star;
