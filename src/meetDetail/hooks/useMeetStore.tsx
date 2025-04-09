import { useState } from "react";
import { getMeetDetailService } from "../services/getMeetDetailService";
import { useMeetStore } from "../store/getMeetStore";
import { handleError } from "../../__sentry__/useErrorHandler";

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
      handleError(e, {
        type: "meet-detail",
        page: "meet-detail",
        message: "모임 조회 실패",
        extra: { meetId: meetId },
      });
      resetMeet();
      setLoading(false);
    }
  };

  return { fetchMeet, loading };
};
