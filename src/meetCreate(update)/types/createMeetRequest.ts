// 요청 body 타입 정의
export interface createMeetRequest {
  meetIntro: string;
  meetType: string;
  address: string;
  addressDescription: string;
  meetAt: string; // '2025-02-20T18:00:00' 형식
  memberLimit: number;
  totalCost: number;
}
