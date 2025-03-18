import { meetItem } from "./meetItem.ts";

export default interface ApiResponse {
  success: boolean;
  data: {
    page: number;
    size: number;
    totalElements: number;
    meets: meetItem[];
  };
}
