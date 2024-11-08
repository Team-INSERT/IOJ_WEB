import { customAxios } from "@/shared/utils/customAxios";

type getItemAttackProps = {
  roomId: string;
  targetUserId: number;
  attackItem: string;
};

export const getItemAttack = async (itemAttackInfo: getItemAttackProps) => {
  await customAxios.post("/item/attack", itemAttackInfo);
};
