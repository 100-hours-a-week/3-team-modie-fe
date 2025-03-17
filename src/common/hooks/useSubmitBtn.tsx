import { meetType } from "../types/meetType";

/**
 * 제출 버튼에 대한 상태 변환을 관리합니다.
 * @author 희진
 */

export const useSubmitButton = (meet: meetType["data"] | null) => {
  const isCompleted = meet?.completedAt !== null;
  const isDeleted = meet?.deletedAt !== null;
  const isFull = meet?.members.length === meet?.memberLimit;

  let active = true;
  let description = meet?.meetRule === "guest" ? "모임 참여하기" : "다음";

  if (isCompleted) {
    active = false;
    description = "종료됨";
  } else if (isDeleted) {
    active = false;
    description = "삭제됨";
  } else if (isFull) {
    active = false;
    description = "인원 초과";
  }

  const isVisible = meet?.meetRule === "guest";

  return { active, description, isVisible };
};
