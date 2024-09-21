import { Button, Room } from "@/shared/components";
import * as S from "./style";

const rooms = [
  {
    id: 1,
    link: "",
    category: "",
    roomNumber: 1,
    roomTitle: "방 1",
    gameUserCount: "6대6",
    userCount: "12명중 5명",
    time: 50,
    level: "4",
  },
  {
    id: 2,
    link: "",
    category: "",
    roomNumber: 2,
    roomTitle: "방 2",
    gameUserCount: "3대3",
    userCount: "6명중 2명",
    time: 40,
    level: "3",
  },
  {
    id: 3,
    link: "",
    category: "",
    roomNumber: 3,
    roomTitle: "방 3",
    gameUserCount: "5대5",
    userCount: "10명중 6명",
    time: 30,
    level: "2",
  },
  {
    id: 4,
    link: "",
    category: "",
    roomNumber: 4,
    roomTitle: "방 4",
    gameUserCount: "4대4",
    userCount: "8명중 4명",
    time: 60,
    level: "1",
  },
  {
    id: 5,
    link: "",
    category: "",
    roomNumber: 5,
    roomTitle: "방 5",
    gameUserCount: "6대6",
    userCount: "12명중 7명",
    time: 70,
    level: "5",
  },
  {
    id: 6,
    link: "",
    category: "",
    roomNumber: 6,
    roomTitle: "방 6",
    gameUserCount: "2대2",
    userCount: "4명중 2명",
    time: 20,
    level: "6",
  },
  {
    id: 7,
    link: "",
    category: "",
    roomNumber: 7,
    roomTitle: "방 7",
    gameUserCount: "1대1",
    userCount: "2명중 1명",
    time: 10,
    level: "3",
  },
  {
    id: 8,
    link: "",
    category: "",
    roomNumber: 8,
    roomTitle: "방 8",
    gameUserCount: "7대7",
    userCount: "14명중 9명",
    time: 45,
    level: "4",
  },
  {
    id: 9,
    link: "",
    category: "",
    roomNumber: 9,
    roomTitle: "방 9",
    gameUserCount: "5대5",
    userCount: "10명중 8명",
    time: 35,
    level: "2",
  },
  {
    id: 10,
    link: "",
    category: "",
    roomNumber: 10,
    roomTitle: "방 10",
    gameUserCount: "6대6",
    userCount: "12명중 6명",
    time: 55,
    level: "4",
  },
  {
    id: 11,
    link: "",
    category: "",
    roomNumber: 11,
    roomTitle: "방 11",
    gameUserCount: "3대3",
    userCount: "6명중 3명",
    time: 25,
    level: "1",
  },
  {
    id: 12,
    link: "",
    category: "",
    roomNumber: 12,
    roomTitle: "방 12",
    gameUserCount: "4대4",
    userCount: "8명중 5명",
    time: 65,
    level: "5",
  },
];

export const GameFind = () => (
  <S.GameFindLayout>
    <S.Title>게임찾기</S.Title>
    <S.FindCreateGame>
      <S.FindGame placeholder="방 제목을 입력하세요." />
      <Button mode="small" color="blue" font="nexon">
        방 생성하기
      </Button>
    </S.FindCreateGame>
    <S.GameList>
      {rooms.map((room) => (
        <Room
          key={room.id}
          link={room.link}
          category={room.category}
          roomNumber={room.roomNumber}
          roomTitle={room.roomTitle}
          gameUserCount={room.gameUserCount}
          userCount={room.userCount}
          time={room.time}
          level={room.level}
        />
      ))}
    </S.GameList>
  </S.GameFindLayout>
);
