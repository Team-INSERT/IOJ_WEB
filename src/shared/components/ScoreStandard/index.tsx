import React from "react";
import exitCircleIcon from "@/assets/CircleExit.svg";
import * as S from "./style";

interface ScoreStandardProps {
  setIsStandardShow: (value: boolean) => void;
}

const ScoreStandard = ({ setIsStandardShow }: ScoreStandardProps) => (
  <S.StandardLayout>
    <S.ModalLayout>
      <S.ExitCircle
        src={exitCircleIcon}
        onClick={() => setIsStandardShow(false)}
      />
      <S.Standard>채점 기준</S.Standard>
      <S.ContentBox>
        <S.Content>
          <S.Topics>
            <S.Texts>
              <S.TopicTitle>문제 해결 수</S.TopicTitle>
              <S.TopicContents>
                <S.TopicContent>참가자가 해결한 문제의 개수가</S.TopicContent>
                <S.TopicContent>
                  <S.BlueColor>가장 중요한 순위 결정 요소</S.BlueColor>입니다.
                </S.TopicContent>
              </S.TopicContents>
            </S.Texts>
            <S.Texts>
              <S.TopicTitle>패널티</S.TopicTitle>
              <S.TopicContents>
                <S.TopicContent>문제 해결 수가 동일한 경우,</S.TopicContent>
                <S.TopicContent>
                  <S.BlueColor>
                    페널티가 적은 참가자가 상위 순위를 차지
                  </S.BlueColor>
                  합니다.
                </S.TopicContent>
              </S.TopicContents>
            </S.Texts>
            <S.Texts>
              <S.TopicTitle>실패한 문제</S.TopicTitle>
              <S.TopicContents>
                <S.TopicContent>
                  실패(failed) 상태인 문제는 점수가
                </S.TopicContent>
                <S.TopicContent>
                  부여되지 않으며 순위 산정에서 제외됩니다.
                </S.TopicContent>
              </S.TopicContents>
              <S.TopicContent>
                실패한 문제에 대한{" "}
                <S.BlueColor>추가 페널티는 부여되지 않습니다.</S.BlueColor>
              </S.TopicContent>
            </S.Texts>
          </S.Topics>
        </S.Content>
        <S.CenterLine />
        <S.Content>
          <S.Topics>
            <S.Texts>
              <S.TopicTitle>실격</S.TopicTitle>
              <S.TopicContents>
                <S.TopicContent>
                  부정행위 등으로 실격 처리된 경우,
                </S.TopicContent>
                <S.TopicContent>
                  해당 참가자는 모든 점수가 0점 처리되며
                </S.TopicContent>
                <S.TopicContent>
                  <S.RedColor>순위에서 제외</S.RedColor>됩니다.
                </S.TopicContent>
              </S.TopicContents>
            </S.Texts>
          </S.Topics>
        </S.Content>
      </S.ContentBox>
      <S.Background />
      <S.Background isSecond />
    </S.ModalLayout>
  </S.StandardLayout>
);

export default ScoreStandard;
