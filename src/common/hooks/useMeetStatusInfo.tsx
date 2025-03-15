import { useMemo } from "react";
import dayjs from "dayjs";
import { meetType } from "../types/meetType";

/**
 * 모임의 진행 여부, 유저의 롤에 대한 값을 관리합니다.
 * @author 희진
 */

export function useMeetStatusInfo(meetStatus?: meetType["data"]) {
  return useMemo(() => {
    if (!meetStatus) return null;

    const currentTime = dayjs();
    const meetTime = dayjs(meetStatus.meetDt);
    const isBeforeMeet = currentTime.isBefore(meetTime);
    const isEnded = !!meetStatus.completedAt;
    const isOwner = meetStatus.meetRule === "owner";
    const isMember = meetStatus.meetRule === "member";

    return {
      isBeforeMeet,
      isEnded,
      isOwner,
      isMember,
    };
  }, [meetStatus]);
}
