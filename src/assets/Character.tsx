import { SVGProps } from "react";

const allowedColors: { [key: string]: string } = {
  skyblue: "#5CE2FF",
  orange: "#FF984D",
  neon: "#65EE83",
  purple: "#C449EE",
  red: "#FF6B6B",
  pink: "#FF6AC3",
  blue: "#6B71FF",
};

interface CharacterProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  characterColor?: keyof typeof allowedColors;
  width?: number;
}

const Character = ({
  characterColor = "skyblue",
  width = 155,
  ...props
}: CharacterProps) => {
  const validatedColor = allowedColors[characterColor] || "#D9D9D9";

  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 96 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ zIndex: 1 }}
    >
      <g id="Group 49">
        <path
          id="Rectangle 100"
          d="M12 92H32V96C32 98.2091 30.2091 100 28 100H16C13.7909 100 12 98.2091 12 96V92Z"
          fill={validatedColor}
        />
        <rect
          id="Rectangle 101"
          width="96"
          height="92"
          rx="4"
          fill={validatedColor}
        />
        <path
          id="Rectangle 102"
          d="M64 92H84V96C84 98.2091 82.2091 100 80 100H68C65.7909 100 64 98.2091 64 96V92Z"
          fill={validatedColor}
        />
        <g id="Group 46">
          <g id="Group 44">
            <g id="Group 48">
              <circle
                id="Ellipse 4"
                cx="26.0001"
                cy="32.3384"
                r="5"
                fill="black"
              />
            </g>
          </g>
          <g id="Group 47">
            <g id="Group 43">
              <circle
                id="Ellipse 5"
                cx="69.0161"
                cy="32.3384"
                r="5"
                fill="black"
              />
            </g>
          </g>
          <path
            id="Polygon 25"
            d="M37.1353 47.4378C36.1612 47.1652 36.1612 45.7843 37.1353 45.5117L49.3481 42.0948C49.9858 41.9164 50.6176 42.3957 50.6176 43.0578V49.8917C50.6176 50.5538 49.9858 51.0331 49.3481 50.8547L37.1353 47.4378Z"
            fill="#FFDF36"
          />
        </g>
      </g>
    </svg>
  );
};

export default Character;
