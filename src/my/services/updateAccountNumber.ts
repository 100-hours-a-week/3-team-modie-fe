import axiosInstance from "../../__api__/axiosConfig";
import { apiResponse } from "../../common/types/apiResponse";
import { updateAccountNumberRequest } from "../types/updateAccountNumberRequest";
import { updateAccountNumberResponse } from "../types/updateAccountNumberResponse";

/**
 * 사용자 계좌번호 업데이트 API
 * @author 희진
 */

export const updateAccountNumberService = async (
  requestData: updateAccountNumberRequest,
  token: string
): Promise<apiResponse<updateAccountNumberResponse>> => {
  const response = await axiosInstance.patch(
    "/api/v1/users/accounts",
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
