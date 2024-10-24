import InkLogo from "@/assets/inkLogo";
import { useEffect, useState } from "react";
import * as S from "./style";

const positions = [
  { id: 1, top: "4%", left: "17%" },
  { id: 2, top: "-8%", left: "84%" },
  { id: 3, top: "40%", left: "-4%" },
  { id: 4, top: "20%", left: "55%" },
  { id: 5, top: "85%", left: "8%" },
  { id: 6, top: "49%", left: "34%" },
  { id: 7, top: "54%", left: "80%" },
];

const OctopusInk = () => {
  const [visibleLogos, setVisibleLogos] = useState<number[]>([]);
  const [expand, setExpand] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    positions.forEach((pos, index) => {
      setTimeout(() => {
        setVisibleLogos((prev) => [...prev, pos.id]);
      }, index * 200);
    });
  }, []);

  useEffect(() => {
    if (visibleLogos.length === positions.length) {
      setTimeout(() => {
        setExpand(true);
        setHideText(true);
      }, 600);
      setTimeout(() => {
        setShrink(true);
      }, 4000);
    }
  }, [visibleLogos]);

  return (
    <S.Layout>
      {positions.map((pos) => (
        <S.LogoContainer
          key={pos.id}
          style={{
            top: pos.top,
            left: pos.left,
            opacity: visibleLogos.includes(pos.id) ? 1 : 0,
            transform: expand ? (shrink ? "scale(0)" : "scale(3)") : "scale(1)", // 축소 및 확대
            transition: "transform 2s ease-in-out, opacity 0.5s ease-in",
          }}
        >
          <InkLogo />
        </S.LogoContainer>
      ))}
      <S.NoShildText
        style={{
          opacity: hideText ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <S.BigText>🐙</S.BigText> 방어실패
      </S.NoShildText>
    </S.Layout>
  );
};

export default OctopusInk;
