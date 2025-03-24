import axiosInstance from "../../__api__/axiosConfig";
import { getUserResponse } from "../types/getUserResponse";
import { apiResponse } from "../../common/types/apiResponse";

/**
 * 사용자 프로필 조회 API
 * @author 희진
 */

export const getUserService = async (
  token: string
): Promise<apiResponse<getUserResponse>> => {
  const response = await axiosInstance.get("/api/v1/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
