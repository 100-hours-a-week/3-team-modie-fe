export interface meetType {
  success: boolean;
  data: {
    meetId: number;
    ownerName: string;
    meetIntro: string;
    meetType: string;
    meetDt: string;
    address: string;
    addressDetail: string;
    totalCost: number;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
    completedAt: string | null;
    meetRule: string;
    members: meetMembers[];
  };
}

export interface meetMembers {
  userId: number;
  name: string;
  payed: boolean;
}
