import { create } from "zustand";

/**
 * 모임 생성시 상태관리
 * @author 희진
 */

export interface MeetInfo {
  meetId: number;
  intro: string;
  category: string;
  customType: string;
  meetAt?: string;
  date: string;
  time: { hour: string; minute: string };
  memberCount: number;
  hasCost: boolean;
  cost: number;
  address: string;
  addressDescription: string;
  lat: number | null;
  lng: number | null;
}

interface MeetStore {
  meetInfo: MeetInfo;
  isEditMode: boolean;
  editMeetInfo: MeetInfo | null;

  setMeetInfo: (info: Partial<MeetInfo>) => void;
  resetMeetInfo: () => void;

  setEditMode: (mode: boolean) => void;
  setEditMeetInfo: (info: MeetInfo | null) => void;
}

export const useCreateMeetStore = create<MeetStore>((set) => ({
  meetInfo: {
    meetId: 0,
    intro: "",
    category: "",
    customType: "",
    meetAt: "",
    date: "",
    time: { hour: "", minute: "" },
    memberCount: 0,
    hasCost: false,
    cost: 0,
    address: "",
    addressDescription: "",
    lat: null,
    lng: null,
  },

  isEditMode: false,
  editMeetInfo: null,

  setMeetInfo: (info) =>
    set((state) => ({
      meetInfo: { ...state.meetInfo, ...info },
    })),
  resetMeetInfo: () =>
    set(() => ({
      meetInfo: {
        meetId: 0,
        intro: "",
        category: "",
        customType: "",
        meetAt: "",
        date: "",
        time: { hour: "", minute: "" },
        memberCount: 0,
        hasCost: false,
        cost: 0,
        address: "",
        addressDescription: "",
        lat: null,
        lng: null,
      },
      isEditMode: false,
      editMeetInfo: null,
    })),

  setEditMode: (mode) => set(() => ({ isEditMode: mode })),
  setEditMeetInfo: (info) => set(() => ({ editMeetInfo: info })),
}));
