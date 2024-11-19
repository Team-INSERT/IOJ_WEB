import { SVGProps } from "react";

interface WaitingCharacterProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const WaitingCharacter = ({
  color = "#D9D9D9",
  ...props
}: WaitingCharacterProps) => (
  <svg
    width="155"
    height="164"
    viewBox="0 0 155 164"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 150H51.8317C51.8317 157.393 45.8384 163.386 38.4453 163.386H28.3864C20.9933 163.386 15 157.393 15 150Z"
      fill={color}
    />
    <path
      d="M102.822 149.833H139.654C139.654 157.226 133.66 163.22 126.267 163.22H116.208C108.815 163.22 102.822 157.226 102.822 149.833Z"
      fill={color}
    />
    <rect width="155" height="150" rx="16" fill={color} />
    <circle cx="40.188" cy="55.6944" r="8.61111" fill="black" />
    <circle cx="114.272" cy="55.6944" r="8.61111" fill="black" />
    <path
      d="M56.88 81.0038C55.9059 80.7313 55.9059 79.3503 56.88 79.0778L81.3159 72.2411C81.9535 72.0627 82.5854 72.542 82.5854 73.2041V86.8775C82.5854 87.5396 81.9535 88.0189 81.3159 87.8405L56.88 81.0038Z"
      fill="#FFDF36"
    />
  </svg>
);

export default WaitingCharacter;
