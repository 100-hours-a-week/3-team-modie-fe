import axiosInstance from "../../__api__/axiosConfig";

/**
 * 정산 내역 업데이트 API
 * @param meetId 모임 ID
 * @param token 인증 토큰
 * @author 희진
 */

export const updatePaymentService = async (meetId: number, token: string) => {
  const response = await axiosInstance.patch(
    `/api/v1/meets/${meetId}/payments`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
