const fontGenerator = (
  weight: number,
  size: number,
  lineHeight: number,
  fontFamily: string,
) => `
  font-weight: ${weight};
  font-size: ${size}rem;
  line-height: ${lineHeight}%;
  font-family: ${fontFamily};
`;

export const NexonFont = {
  NexonBigTitle3: fontGenerator(900, 3.75, 110, "NEXONFootballGothicBA1"),
  NexonBigTitle2: fontGenerator(700, 2.5, 130, "NEXONFootballGothicBA1"),
  NexonBigTitle: fontGenerator(700, 1.5, 110, "NEXONFootballGothicBA1"),
  NexonTitle: fontGenerator(700, 1.25, 130, "NEXONFootballGothicBA1"),
  NexonSmallTitle: fontGenerator(700, 1.125, 130, "NEXONFootballGothicBA1"),
  NexonBigText: fontGenerator(400, 1.5, 130, "NEXONFootballGothicBA1"),
  NexonText: fontGenerator(400, 1, 130, "NEXONFootballGothicBA1"),
  NexonSmallText: fontGenerator(400, 0.875, 130, "NEXONFootballGothicBA1"),
  NexonCaption: fontGenerator(400, 0.75, 130, "NEXONFootballGothicBA1"),
};

export const Pretendard = {
  BigTitle3: fontGenerator(900, 3.75, 110, "Pretendard-Regular"),
  BigTitle2: fontGenerator(700, 2.5, 130, "Pretendard-Regular"),
  BigTitle: fontGenerator(700, 1.5, 110, "Pretendard-Regular"),
  Title: fontGenerator(700, 1.25, 130, "Pretendard-Regular"),
  SmallTitle: fontGenerator(700, 1.125, 130, "Pretendard-Regular"),
  BigText: fontGenerator(400, 1.5, 130, "Pretendard-Regular"),
  Text: fontGenerator(400, 1, 130, "Pretendard-Regular"),
  SmallText: fontGenerator(400, 0.875, 130, "Pretendard-Regular"),
  Caption: fontGenerator(400, 0.75, 130, "Pretendard-Regular"),
};
