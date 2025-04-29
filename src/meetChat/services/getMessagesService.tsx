import axiosInstance from "../../__api__/axiosConfig";
import { apiResponse } from "../../common/types/apiResponse";
import { getMessagesResponse } from "../types/getMessagesResponse";

export const getMessagesService = async (
  meetId: string,
  token: string
): Promise<apiResponse<getMessagesResponse>> => {
  const response = await axiosInstance.get(`/api/v1/chat/${meetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("📨 getMessagesService response:", response.data);

  return response.data;
};
