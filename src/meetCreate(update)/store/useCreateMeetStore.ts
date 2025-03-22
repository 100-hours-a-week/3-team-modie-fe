import { create } from "zustand";

/**
 * 모임 생성시 상태관리
 * @author 희진
 */

interface MeetInfo {
  intro: string;
  category: string;
  customType: string;
  date: string;
  time: { hour: string; minute: string };
  memberCount: number;
  hasCost: boolean;
  cost: number;
  address: string;
  addressDetail: string;
  lat: number | null;
  lng: number | null;
}

interface MeetStore {
  meetInfo: MeetInfo;
  setMeetInfo: (info: Partial<MeetInfo>) => void;
  resetMeetInfo: () => void;
}

export const useCreateMeetStore = create<MeetStore>((set) => ({
  meetInfo: {
    intro: "",
    category: "",
    customType: "",
    date: "",
    time: { hour: "", minute: "" },
    memberCount: 0,
    hasCost: false,
    cost: 0,
    address: "",
    addressDetail: "",
    lat: null,
    lng: null,
  },
  setMeetInfo: (info) =>
    set((state) => ({
      meetInfo: { ...state.meetInfo, ...info },
    })),
  resetMeetInfo: () =>
    set(() => ({
      meetInfo: {
        intro: "",
        category: "",
        customType: "",
        date: "",
        time: { hour: "", minute: "" },
        memberCount: 0,
        hasCost: false,
        cost: 0,
        address: "",
        addressDetail: "",
        lat: null,
        lng: null,
      },
    })),
}));
