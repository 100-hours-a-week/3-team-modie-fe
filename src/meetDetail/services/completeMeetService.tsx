import axiosInstance from "../../__api__/axiosConfig";
import { AxiosError } from "axios";

/**
 * 모임 종료 API
 * @param meetId 모임 ID
 * @param token 인증 토큰
 * @author 희진
 */

export const completeMeetService = async (meetId: string, token: string) => {
  try {
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
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 409) {
      return "M015";
    }

    throw axiosError;
  }
};
