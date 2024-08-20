import { useState, useEffect } from "react";
import Star from "@/assets/Star";
import BlueStar from "@/assets/BlueStar";

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

  return (
    <>
      {[0,1,2,3,4].map((_, index) => (
        <span
          onClick={() => handleClick(index)}
          style={{ cursor: setting ? "pointer" : "default" }}
          key={_}
        >
          {index < currentStarsValue ? <BlueStar /> : <Star />}
        </span>
      ))}
    </>
  );
};

export default Stars;
