import { getMeetDetailService } from "../services/getMeetDetailService";
import { useMeetStore } from "../store/getMeetStore";

export const useFetchMeet = () => {
  const { setMeet, resetMeet } = useMeetStore();

  const fetchMeet = async (meetId: string) => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await getMeetDetailService(meetId, token);
      setMeet(res.data);
    } catch {
      console.log("모임 상세 조회에 실패했어요.");
      resetMeet();
    }
  };

  return { fetchMeet };
};
