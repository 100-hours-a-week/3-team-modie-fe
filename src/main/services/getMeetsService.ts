import axiosInstance from "../../__api__/axiosConfig";
import { apiResponse } from "../../common/types/apiResponse";
import { meetItem } from "../types/meetItem";

/**
 * 모임 목록 조회 API
 * @author 희진
 */

interface MeetsResponseData {
  page: number;
  size: number;
  totalElements: number;
  meets: meetItem[];
}

export const getMeetsService = async ({
  category,
  completed,
  page,
  token,
}: {
  category: string;
  completed: boolean;
  page: number;
  token: string;
}): Promise<apiResponse<MeetsResponseData>> => {
  const response = await axiosInstance.get("/api/v1/meets", {
    params: {
      category,
      completed,
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
