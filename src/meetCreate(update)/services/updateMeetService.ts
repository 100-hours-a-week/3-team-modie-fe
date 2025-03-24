import axiosInstance from "../../__api__/axiosConfig";
import { updateMeetRequest } from "../types/updateMeetRequest";
import { updateMeetResponse } from "../types/updateMeetResponse";
import { apiResponse } from "../../common/types/apiResponse";

/**
 * 모임 수정 API
 * @author 희진
 */

export const updateMeetService = async (
  meetId: number,
  requestData: updateMeetRequest,
  token: string
): Promise<apiResponse<updateMeetResponse>> => {
  const response = await axiosInstance.patch(
    `/api/v1/meets/${meetId}`,
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
