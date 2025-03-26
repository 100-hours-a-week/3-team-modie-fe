import axiosInstance from "../../__api__/axiosConfig";

/**
 * 모임 종료 API
 * @param meetId 모임 ID
 * @param token 인증 토큰
 * @author 희진
 */

export const completeMeetService = async (meetId: number, token: string) => {
  const response = await axiosInstance.patch(
    `/api/v1/meets/${meetId}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
