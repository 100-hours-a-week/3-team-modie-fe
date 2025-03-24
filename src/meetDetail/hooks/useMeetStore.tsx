import { create } from "zustand";
import { meetType } from "../../common/types/meetType";
import axios from "axios";
// import axios from "axios";

interface MeetState {
  meet: meetType | null;
  fetchMeet: (meetId: number) => Promise<void>;
}

/**
 * 모임 조회시에 api 요청을 보냅니다.
 * 현재는 더미 데이터로~ (25.03.15)
 * @author 희진
 */

export const useMeetStore = create<MeetState>((set) => ({
  meet: null,
  fetchMeet: async (meetId) => {
    try {
      const response = await axios.get(`/api/v1/meets/${meetId}`);

      // NOTE: api 연동 전 더미데이터
      // const dummyData: meetType = {
      //   meetId,
      //   ownerName: "허지노",
      //   meetIntro: "제주 해안 드라이브 같이 갈 사람 구해요! 맛집도 가용",
      //   meetType: "여행",
      //   meetAt: "2025-03-30T12:00:00",
      //   address: "제주특별자치도 제주시 월성로 4길 19",
      //   addressDetail: "노블레스호텔 정문",
      //   totalCost: 10000,
      //   memberLimit: 5,
      //   createdAt: "2025-03-10T12:00:00",
      //   updatedAt: "2025-03-10T12:00:01",
      //   deletedAt: null,
      //   completedAt: null,
      //   meetRule: "guest",
      //   members: [
      //     {
      //       userId: 123,
      //       name: "제이드는 크크크 치킨을 좋아해 족발도 좋아해",
      //       payed: true,
      //     },
      //     { userId: 234, name: "제이드2", payed: false },
      //     { userId: 345, name: "제이드3", payed: false },
      //   ],
      // };

      set({ meet: response.data.data }); // 상태 업데이트
      // set({ meet: dummyData }); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch meet:", error);
    }
  },
}));
