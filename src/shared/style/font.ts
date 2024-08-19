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
  NexonBigTitle3: fontGenerator(500, 4.5, 110, "NEXONFootballGothicBA1"),
  NexonBigTitle2: fontGenerator(500, 3.625, 130, "NEXONFootballGothicBA1"),
  NexonBigTitle: fontGenerator(500, 2.875, 110, "NEXONFootballGothicBA1"),
  NexonTitle: fontGenerator(500, 2.313, 130, "NEXONFootballGothicBA1"),
  NexonSmallTitle: fontGenerator(500, 1.875, 130, "NEXONFootballGothicBA1"),
  NexonBigText: fontGenerator(500, 1.5, 130, "NEXONFootballGothicBA1"),
  NexonText: fontGenerator(500, 1.188, 130, "NEXONFootballGothicBA1"),
  NexonSmallText: fontGenerator(500, 0.938, 130, "NEXONFootballGothicBA1"),
  NexonCaption: fontGenerator(500, 0.75, 130, "NEXONFootballGothicBA1"),
};

export const Pretendard = {
  BigTitle3: fontGenerator(700, 4.5, 110, "Pretendard-Regular"),
  BigTitle2: fontGenerator(700, 3.625, 130, "Pretendard-Regular"),
  BigTitle: fontGenerator(700, 2.875, 110, "Pretendard-Regular"),
  Title: fontGenerator(700, 2.313, 130, "Pretendard-Regular"),
  SmallTitle: fontGenerator(700, 1.875, 130, "Pretendard-Regular"),
  BigText: fontGenerator(600, 1.5, 130, "Pretendard-Regular"),
  Text: fontGenerator(400, 1.188, 130, "Pretendard-Regular"),
  SmallText: fontGenerator(700, 0.938, 130, "Pretendard-Regular"),
  Caption: fontGenerator(400, 0.75, 130, "Pretendard-Regular"),
};

export const RobotoMono = {
  Text: fontGenerator(400, 1.1875, 130, "Roboto Mono"),
  SmallText: fontGenerator(400, 0.9375, 130, "Roboto Mono")
}