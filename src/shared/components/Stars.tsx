import { useState } from "react";
import Star from "../../assets/Star";
import BlueStar from "../../assets/BlueStar";

interface StarsProps {
  read?: boolean;
  value?: number;
  setting?: boolean;
}

const Stars = ({ read = false, value = 0, setting = false }: StarsProps) => {
  const [currentStarsValue, setCurrentStartsValue] = useState(value);

  const handleClick = (index: number) => {
    if (setting) {
      setCurrentStartsValue(index + 1);
    }
  };

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          style={{ cursor: setting ? "pointer" : "default" }}
        >
          {index < currentStarsValue ? <BlueStar /> : <Star />}
        </span>
      ))}
    </>
  );
};

export default Stars;
