import Close from "@/assets/Close";
import Crown from "@/assets/Crown";
import * as S from "./style";

interface Details {
  status: string;
  userName: string;
}

const WaitingRoom = ({ status, userName }: Details) => (
  <S.Layout status={status}>
    {status === "user" ? (
      <>
        <S.No>
          <Close />
        </S.No>
        <S.DotBox />
        <S.UserName>{userName}</S.UserName>
      </>
    ) : status === "leader" ? (
      <>
        <S.No>
          <Close />
        </S.No>
        <S.DotBox>
          <S.Crown>
            <Crown />
          </S.Crown>
        </S.DotBox>
        <S.UserName>{userName}</S.UserName>
      </>
    ) : null}
  </S.Layout>
);
export default WaitingRoom;
