import axiosInstance from "../../__api__/axiosConfig";
import { apiResponse } from "../../common/types/apiResponse";
import { postFcmRequest } from "../types/postFcmRequest";
import { postFcmResponse } from "../types/postFcmResponse";

/**
 * FCM 토큰을 서버로 전송하는 API
 * @author 희진
 */

export const postFcmService = async (
  requestData: postFcmRequest,
  token: string
): Promise<apiResponse<postFcmResponse>> => {
  const response = await axiosInstance.post("/api/v1/users/fcm", requestData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
