import React, { useEffect, useState } from "react";
import * as S from "./style";
import ItemStatusText from "../../ItemStatusText";

const Shield = () => {
  const [hexagonVisible, setHexagonVisible] = useState<boolean[]>(
    Array(12).fill(false),
  );
  const [fadeOut, setFadeOut] = useState<boolean[]>(Array(12).fill(false));
  const [textVisible, setTextVisible] = useState(false);
  const [textTranslate, setTextTranslate] = useState(0);

  useEffect(() => {
    setHexagonVisible(Array(12).fill(true));
    const fadeOutHexagon = (index: number) => {
      setFadeOut((prev) => {
        const newFade = [...prev];
        newFade[index] = true;
        return newFade;
      });
      setTimeout(() => {
        setHexagonVisible((prev) => {
          const newVisible = [...prev];
          newVisible[index] = false;
          return newVisible;
        });
      }, 600);
    };

    const timeout = setTimeout(() => {
      const leftTimeouts = Array.from({ length: 6 }, (_, i) =>
        setTimeout(() => fadeOutHexagon(i), 100 * (i + 1)),
      );

      const rightTimeouts = Array.from({ length: 6 }, (_, i) =>
        setTimeout(() => fadeOutHexagon(11 - i), 100 * (i + 1)),
      );

      return () => {
        leftTimeouts.forEach(clearTimeout);
        rightTimeouts.forEach(clearTimeout);
      };
    }, 600);

    setTimeout(() => {
      setTextVisible(true);
      setTextTranslate(-30);

      setTimeout(() => {
        setTextTranslate(40);

        setTimeout(() => {
          setTextVisible(false);
        }, 600);
      }, 800);
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <S.Layout>
      <S.LeftContainer>
        <S.Row>
          <S.Hexagon visible={hexagonVisible[0]} fadeOut={fadeOut[0]} />
          <S.Hexagon visible={hexagonVisible[1]} fadeOut={fadeOut[1]} />
        </S.Row>
        <S.Row1>
          <S.Hexagon visible={hexagonVisible[2]} fadeOut={fadeOut[2]} />
          <S.Hexagon visible={hexagonVisible[3]} fadeOut={fadeOut[3]} />
        </S.Row1>
        <S.Row>
          <S.Hexagon visible={hexagonVisible[4]} fadeOut={fadeOut[4]} />
        </S.Row>
        <S.Row1>
          <S.Hexagon visible={hexagonVisible[5]} fadeOut={fadeOut[5]} />
        </S.Row1>
      </S.LeftContainer>
      <S.RightContainer>
        <S.Row2>
          <S.Hexagon style={{ visibility: "hidden" }} />
          <S.Hexagon visible={hexagonVisible[6]} fadeOut={fadeOut[6]} />
        </S.Row2>
        <S.Row3>
          <S.Hexagon style={{ visibility: "hidden" }} />
          <S.Hexagon visible={hexagonVisible[7]} fadeOut={fadeOut[7]} />
        </S.Row3>
        <S.Row2>
          <S.Hexagon visible={hexagonVisible[8]} fadeOut={fadeOut[8]} />
          <S.Hexagon visible={hexagonVisible[9]} fadeOut={fadeOut[9]} />
        </S.Row2>
      </S.RightContainer>
      {textVisible && (
        <S.NoShieldText
          style={{
            transform: `translateY(${textTranslate}px)`,
            opacity: textVisible ? 1 : 0,
            transition: "transform 0.6s ease, opacity 0.6s ease",
          }}
        >
          <ItemStatusText status="방어 성공" title="물풍선" />
        </S.NoShieldText>
      )}
    </S.Layout>
  );
};

export default Shield;
