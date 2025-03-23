import { create } from "zustand";
import { meetType } from "../../common/types/meetType";

interface MeetStoreState {
  meet: meetType | null;
  setMeet: (data: meetType) => void;
  resetMeet: () => void;
}

/**
 * 모임 데이터의 상태를 관리합니다.
 * @author 희진
 */

export const useMeetStore = create<MeetStoreState>((set) => ({
  meet: null,
  setMeet: (data) => set({ meet: data }),
  resetMeet: () => set({ meet: null }),
}));
