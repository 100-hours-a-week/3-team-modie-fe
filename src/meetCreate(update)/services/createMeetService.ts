import axiosInstance from "../../__api__/axiosConfig";
import { createMeetRequest } from "../types/createMeetRequest";
import { createMeetResponse } from "../types/createMeetResponse";
import { apiResponse } from "../../common/types/apiResponse";

/**
 * 모임 생성 API
 * @author 희진
 */

export const createMeetService = async (
  requestData: createMeetRequest,
  token: string
): Promise<apiResponse<createMeetResponse>> => {
  const response = await axiosInstance.post("/api/v1/meets", requestData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
