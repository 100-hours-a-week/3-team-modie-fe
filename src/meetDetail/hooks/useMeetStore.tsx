import { getMeetDetailService } from "../services/getMeetDetailService";
import { useMeetStore } from "../store/getMeetStore";

export const useFetchMeet = () => {
  const { setMeet, resetMeet } = useMeetStore();

  const fetchMeet = async (meetId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("로그인이 필요합니다.");
        resetMeet();
        return;
      }

      const res = await getMeetDetailService(meetId, token);
      setMeet(res.data);
    } catch {
      console.log("모임 상세 조회에 실패했어요.");
      resetMeet();
    }
  };

  return { fetchMeet };
};
