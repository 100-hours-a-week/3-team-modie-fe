import axiosInstance from "../../__api__/axiosConfig";
import { apiResponse } from "../../common/types/apiResponse";

/**
 * 모임 삭제 API
 * @param meetId 모임 ID
 * @param token 인증 토큰
 * @author 희진
 */

export const deleteMeetService = async (
  meetId: string,
  token: string
): Promise<apiResponse<null>> => {
  const response = await axiosInstance.delete(`/api/v1/meets/${meetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
