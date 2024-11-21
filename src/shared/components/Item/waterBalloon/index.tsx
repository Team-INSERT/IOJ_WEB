import { useState, useEffect, useRef } from "react";
import Balloon from "@/assets/Balloon";
import Cursor from "@/assets/cursor.svg";
import Boom from "@/assets/boom.svg";
import * as S from "./style";
import ItemStatusText from "../../ItemStatusText";

const WaterBalloon = ({
  notifyExecutionState, // 새로운 방식으로 상태 전달
  onAnimationComplete,
}: {
  notifyExecutionState: (state: "idle" | "running" | "completed") => void;
  onAnimationComplete: () => void;
}) => {
  const [width, setWidth] = useState(1200);
  const [spaceCount, setSpaceCount] = useState(0);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(false);
  const [textTranslate, setTextTranslate] = useState(0);

  const isBurstingRef = useRef(false); // 애니메이션 실행 여부 추적

  // 애니메이션 상태를 외부에 알림
  const updateExecutionState = (state: "idle" | "running" | "completed") => {
    if (notifyExecutionState) {
      notifyExecutionState(state);
    }
  };

  const handleAnimationEnd = () => {
    isBurstingRef.current = false;
    updateExecutionState("completed");
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      if (!isSpacePressed) {
        setIsSpacePressed(true);
        if (spaceCount < 18) {
          setWidth((prevWidth) => prevWidth * 0.948);
          setSpaceCount((prevCount) => prevCount + 1);
        }

        if (spaceCount === 17 && !isBurstingRef.current) {
          isBurstingRef.current = true;
          updateExecutionState("running");
        }
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      setIsSpacePressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [spaceCount, isSpacePressed]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isBurstingRef.current) {
      const boomImage = document.getElementById("boomImage");
      if (boomImage) {
        boomImage.addEventListener("animationend", handleAnimationEnd);
        return () => {
          boomImage.removeEventListener("animationend", handleAnimationEnd);
        };
      }
    }
  }, [isBurstingRef.current]);

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
      {!isBurstingRef.current && <S.Bar>{barColors}</S.Bar>}
      {!isBurstingRef.current && spaceCount < 18 ? (
        <S.AnimatedBalloon>
          <Balloon width={width} />
        </S.AnimatedBalloon>
      ) : null}
      {isBurstingRef.current && (
        <S.BoomImage
          id="boomImage"
          src={Boom}
          alt="Boom!"
          style={{
            opacity: isBurstingRef.current ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        />
      )}
      {!isBurstingRef.current && (
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
