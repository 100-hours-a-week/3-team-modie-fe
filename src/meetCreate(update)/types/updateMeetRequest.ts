export interface updateMeetRequest {
  meetIntro: string;
  meetType: string;
  address: string;
  addressDescription: string;
  meetAt: string;
  memberCount?: number;
  cost?: number;
}
