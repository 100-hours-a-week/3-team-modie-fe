import axiosInstance from "../../__api__/axiosConfig";
import { apiResponse } from "../../common/types/apiResponse";
import { meetType } from "../../common/types/meetType";

/**
 * 모임 상세 조회 API
 * @param meetId 모임 ID
 * @param token 인증 토큰 -> 추후 추가 예정
 * @returns 모임 상세 정보
 * @author 희진
 */

export const getMeetDetailService = async (
  meetId: string,
  token?: string
): Promise<apiResponse<meetType>> => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  const response = await axiosInstance.get(`/api/v1/meets/${meetId}`, config);
  return response.data;
};
