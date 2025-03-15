import { useMemo } from "react";
import dayjs from "dayjs";
import { meetType } from "../types/meetType";

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
