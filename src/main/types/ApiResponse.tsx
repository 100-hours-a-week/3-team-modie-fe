import Meet from "./Meet.tsx";

export default interface ApiResponse {
  success: boolean;
  data: {
    page: number;
    size: number;
    totalElements: number;
    meets: Meet[];
  };
}
