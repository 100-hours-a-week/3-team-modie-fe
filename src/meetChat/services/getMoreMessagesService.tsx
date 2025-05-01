import axiosInstance from "../../__api__/axiosConfig";
import { apiResponse } from "../../common/types/apiResponse";
import { getMessagesResponse } from "../types/getMessagesResponse";

export const getMoreMessageService = async (
  meetId: string,
  lastChatId: number,
  token: string
): Promise<apiResponse<getMessagesResponse>> => {
  const response = await axiosInstance.get(
    `/api/v1/chat/${meetId}?lastChatId=${lastChatId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
