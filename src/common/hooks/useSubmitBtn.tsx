import { meetType } from "../types/meetType";

/**
 * 제출 버튼에 대한 상태 변환을 관리합니다. (조건 매핑 방식)
 * @author 희진
 */

export const useSubmitButton = (meet: meetType | null) => {
  const isCompleted = meet?.completedAt !== null;
  const isDeleted = meet?.deletedAt !== null;
  const isFull = meet?.members?.length === meet?.memberLimit;

  const statusMap = {
    completed: {
      active: false,
      description: "종료됨",
    },
    deleted: {
      active: false,
      description: "삭제됨",
    },
    full: {
      active: false,
      description: "인원 초과",
    },
    default: {
      active: true,
      description: meet?.meetRule === "guest" ? "모임 참여하기" : "다음",
    },
  };

  const status = isCompleted
    ? "completed"
    : isDeleted
      ? "deleted"
      : isFull
        ? "full"
        : "default";

  const { active, description } = statusMap[status];

  const isVisible = meet?.meetRule === "guest";

  return { active, description, isVisible };
};
