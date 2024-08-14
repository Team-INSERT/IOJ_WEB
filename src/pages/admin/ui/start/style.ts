import styled from "styled-components";
import { flex } from "@/shared/style";

export const StartLayout = styled.div`
  height: 100vh;
  padding: 134px 280px;
  ${flex.BETWEEN}
`;

export const CreateContest = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

export const CreateQ = styled.div``;

export const Divider = styled.div`
  border-left: solid 3px #b3b3b3;
  height: 25rem;
  border-radius: 5px;
`;
