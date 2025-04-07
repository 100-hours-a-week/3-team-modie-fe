import { useState } from "react";
import { getMeetDetailService } from "../services/getMeetDetailService";
import { useMeetStore } from "../store/getMeetStore";
import * as Sentry from "@sentry/react";

export const useFetchMeet = () => {
  const { setMeet, resetMeet } = useMeetStore();
  const [loading, setLoading] = useState(false);

  const fetchMeet = async (meetId: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken") || "";
      const res = await getMeetDetailService(meetId, token);
      setMeet(res.data);
      setLoading(false);
    } catch (e) {
      Sentry.captureException(e, {
        tags: { feature: "meet-detail", meetId },
        extra: { message: "모임 상세 조회 실패", meetId },
      });
      resetMeet();
      setLoading(false);
    }
  };

  return { fetchMeet, loading };
};
