import { meetType } from "../../common/types/meetType";
// import { getMeetDetailService } from "../services/getMeetDetailService";
import { useMeetStore } from "../store/getMeetStore";

export const useFetchMeet = () => {
  const { setMeet, resetMeet } = useMeetStore();

  const fetchMeet = async (meetId: number) => {
    try {
      //   const token = localStorage.getItem("accessToken");
      //   if (!token) {
      //     console.log("로그인이 필요합니다.");
      //     resetMeet();
      //     return;
      //   }

      //   const res = await getMeetDetailService(meetId, token);
      //   setMeet(res.data);
      // } catch {
      //   console.log("모임 상세 조회에 실패했어요.");
      //   resetMeet();
      // }

      // 더미
      const dummyData: meetType = {
        meetId,
        ownerName: "허지노",
        meetIntro: "제주 해안 드라이브 같이 갈 사람 구해요! 맛집도 가용",
        meetType: "여행",
        meetAt: "2025-03-16T12:00:00",
        address: "제주특별자치도 제주시 월성로 4길 19",
        addressDetail: "노블레스호텔 정문",
        totalCost: 10000,
        memberLimit: 5,
        createdAt: "2025-03-10T12:00:00",
        updatedAt: "2025-03-10T12:00:01",
        deletedAt: null,
        completedAt: null,
        meetRule: "owner",
        members: [
          {
            userId: 123,
            name: "제이드는 크크크 치킨을 좋아해 족발도 좋아해",
            payed: true,
          },
          { userId: 234, name: "제이드2", payed: false },
          { userId: 345, name: "제이드3", payed: false },
        ],
      };

      //   set({ meet: response.data.data });
      setMeet(dummyData); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching meet details:", error);
      resetMeet();
    }
  };

  return { fetchMeet };
};
