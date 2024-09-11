import { useState, useEffect } from "react";
import Star from "@/assets/Star";
import { theme } from "../style";

interface StarsProps {
  read?: boolean;
  value?: number;
  setting?: boolean;
}

const Stars = ({ read = false, value = 0, setting = false }: StarsProps) => {
  const [currentStarsValue, setCurrentStarsValue] = useState(value);

  useEffect(() => {
    setCurrentStarsValue(value);
  }, [value]);

  const handleClick = (index: number) => {
    if (setting) {
      setCurrentStarsValue(index + 1);
    }
  };
  const colorMap: { [key: number]: string } = {
    1: `${theme.blueNormal}`,
    2: `${theme.blueNormalHover}`,
    3: `${theme.blueNormalActive}`,
    4: `${theme.blueDark}`,
    5: `${theme.blueDarkHover}`,
  };
  const getColor = (index: number) => colorMap[currentStarsValue] || "grey";

  return (
    <>
      {[0, 1, 2, 3, 4].map((_, index) => (
        <span
          onClick={() => handleClick(index)}
          style={{ cursor: setting ? "pointer" : "default" }}
          key={_}
        >
          {index < currentStarsValue ? (
            <Star color={getColor(index)} />
          ) : (
            <Star color="grey" />
          )}
        </span>
      ))}
    </>
  );
};

export default Stars;
