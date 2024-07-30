import InsertLogo from "@/assets/InsertLogo";
import GithubLogo from "@/assets/GithubLogo";
import * as S from "./style";

const Footer = () => (
  <S.Layout>
    <S.Logos>
      <InsertLogo />
      <S.GoGithub href="https://github.com/Team-INSERT/IOJ_WEB">
        <GithubLogo />
      </S.GoGithub>
    </S.Logos>
    <S.Names>강지원 | 김시연 | 김영은 | 안예성 | 전영현 | 최성훈</S.Names>
    <S.LineContainer>
      <S.Line />
    </S.LineContainer>
    <S.Details>© 2024. Insert. All rights reserved.</S.Details>
  </S.Layout>
);

export default Footer;
