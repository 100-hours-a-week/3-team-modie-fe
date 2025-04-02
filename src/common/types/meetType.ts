/**
 * 모임 데이터의 타입을 정의합니다.
 * @author 희진
 */

export interface meetType {
  meetId?: string;
  ownerName?: string;
  meetIntro: string;
  meetType: string;
  meetAt: string;
  address: string;
  addressDescription: string;
  totalCost: number;
  memberLimit: number;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
  completedAt?: string | null;
  meetRule?: string;
  members?: meetMembers[];
}

export interface meetMembers {
  userId: number;
  userName: string;
  isPayed: boolean;
}
