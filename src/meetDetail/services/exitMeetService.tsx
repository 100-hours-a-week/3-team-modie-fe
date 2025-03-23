import axiosInstance from "../../__api__/axiosConfig";

/**
 * 모임 나가기 API
 * @param meetId 모임 ID
 * @param token 인증 토큰
 * @author 희진
 */

export const exitMeetService = async (meetId: number, token: string) => {
  const response = await axiosInstance.patch(
    `/api/v1/meets/${meetId}/exit`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
