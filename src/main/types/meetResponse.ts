import { meetItem } from "./meetItem.ts";

export default interface meetResponse {
  success: boolean;
  data: {
    page: number;
    size: number;
    totalElements: number;
    meets: meetItem[];
  };
}
