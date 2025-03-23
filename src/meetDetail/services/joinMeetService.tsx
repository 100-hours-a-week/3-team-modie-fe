import axiosInstance from "../../__api__/axiosConfig";
import { apiResponse } from "../../common/types/apiResponse";

export const joinMeetService = async (
  meetId: number,
  token: string
): Promise<apiResponse<null>> => {
  const response = await axiosInstance.post(`/api/v1/meets/${meetId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
