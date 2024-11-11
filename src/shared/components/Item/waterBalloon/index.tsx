import { useState, useEffect } from "react";
import Balloon from "@/assets/Balloon";
import Cursor from "@/assets/cursor.svg";
import Boom from "@/assets/boom.svg";
import * as S from "./style";
import ItemStatusText from "../../ItemStatusText";

const WaterBalloon = () => {
  const [width, setWidth] = useState(1200);
  const [spaceCount, setSpaceCount] = useState(0);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [hasBurst, setHasBurst] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);
  const [textTranslate, setTextTranslate] = useState(0);
  const [boomAnimationComplete, setBoomAnimationComplete] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      if (!isSpacePressed) {
        setIsSpacePressed(true);
        if (spaceCount < 18) {
          setWidth((prevWidth) => prevWidth * 0.948);
          setSpaceCount((prevCount) => prevCount + 1);
        }
        if (spaceCount === 17) {
          setHasBurst(true);
        }
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      setIsSpacePressed(false);
    }
  };

  const handleAnimationEnd = () => {
    setBoomAnimationComplete(true);
  };

  useEffect(() => {
    if (boomAnimationComplete) {
      setIsVisible(false);
    }
  }, [boomAnimationComplete]);

  useEffect(() => {
    const translateDown = setTimeout(() => {
      setTextVisible(true);
      setTextTranslate(-30);

      setTimeout(() => {
        setTextTranslate(40);

        setTimeout(() => {
          setTextVisible(false);
        }, 600);
      }, 800);
    });

    return () => clearTimeout(translateDown);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [spaceCount, isSpacePressed]);

  useEffect(() => {
    if (hasBurst) {
      const boomImage = document.getElementById("boomImage");
      if (boomImage) {
        boomImage.addEventListener("animationend", handleAnimationEnd);
        return () => {
          boomImage.removeEventListener("animationend", handleAnimationEnd);
        };
      }
    }
    return () => {};
  }, [hasBurst]);

  const barCount = 18;
  const barColors = Array.from({ length: barCount }, (_, index) => {
    if (index < barCount - spaceCount) {
      return <S.White key={index} />;
    }
    if (index < 3) {
      return <S.Red key={index} />;
    }
    if (index < 8) {
      return <S.Orange key={index} />;
    }
    return <S.Yellow key={index} />;
  });

  return isVisible ? (
    <S.Layout>
      {!hasBurst && <S.Bar>{barColors}</S.Bar>}
      {!hasBurst && spaceCount < 18 ? (
        <S.AnimatedBalloon>
          <Balloon width={width} />
        </S.AnimatedBalloon>
      ) : null}
      {hasBurst && (
        <S.BoomImage
          id="boomImage"
          src={Boom}
          alt="Boom!"
          style={{
            opacity: boomAnimationComplete ? 0 : 1,
            transition: "opacity 1s ease",
          }}
        />
      )}
      {!hasBurst && (
        <>
          <S.Space isPressed={isSpacePressed}>SPACE!!</S.Space>
          <S.Cursor src={Cursor} />
        </>
      )}
      {textVisible && (
        <S.NoShieldText
          style={{
            transform: `translateY(${textTranslate}px)`,
            opacity: textVisible ? 1 : 0,
            transition: "transform 0.6s ease, opacity 0.6s ease",
          }}
        >
          <ItemStatusText status="방어 실패" title="물풍선" />
        </S.NoShieldText>
      )}
    </S.Layout>
  ) : null;
};

export default WaterBalloon;
