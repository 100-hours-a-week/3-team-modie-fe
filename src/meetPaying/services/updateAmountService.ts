import axiosInstance from "../../__api__/axiosConfig";

/**
 * 정산 금액 업데이트 API
 * @param meetId 모임 ID
 * @param token 인증 토큰
 * @param cost 비용
 * @author 희진
 */

export const updateAmountService = async (
  meetId: string,
  token: string,
  cost: number
) => {
  const response = await axiosInstance.patch(
    `/api/v1/meets/${meetId}/totalCost`,
    cost,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
