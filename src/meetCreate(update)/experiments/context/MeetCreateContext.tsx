import React, { createContext, useContext, useState } from "react";

export interface MeetInfo {
  date: string;
  time: { hour: string; minute: string };
  memberCount: number;
  hasCost: boolean;
  cost: number;
  meetAt?: string;
  // 추가적으로 editInfo가 활용하는 값이 있다면 여기에 포함시켜도 됨
}

interface MeetContextType {
  meetInfo: MeetInfo;
  setMeetInfo: (info: Partial<MeetInfo>) => void;

  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;

  editMeetInfo: MeetInfo | null;
  setEditMeetInfo: (info: MeetInfo | null) => void;
}

const defaultMeetInfo: MeetInfo = {
  date: "",
  time: { hour: "", minute: "" },
  memberCount: 0,
  hasCost: false,
  cost: 0,
  meetAt: "",
};

const MeetContext = createContext<MeetContextType | undefined>(undefined);

export const MeetProvider = ({ children }: { children: React.ReactNode }) => {
  const [meetInfo, setMeetInfoState] = useState<MeetInfo>(defaultMeetInfo);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editMeetInfo, setEditMeetInfo] = useState<MeetInfo | null>(null);

  const setMeetInfo = (info: Partial<MeetInfo>) => {
    setMeetInfoState((prev) => ({
      ...prev,
      ...info,
    }));
  };

  return (
    <MeetContext.Provider
      value={{
        meetInfo,
        setMeetInfo,
        isEditMode,
        setIsEditMode,
        editMeetInfo,
        setEditMeetInfo,
      }}
    >
      {children}
    </MeetContext.Provider>
  );
};

export const useMeetContext = () => {
  const context = useContext(MeetContext);
  if (!context) {
    throw new Error("useMeetContext must be used within a MeetProvider");
  }
  return context;
};
