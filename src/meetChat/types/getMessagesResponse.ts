import { chatType } from "./chatTypes";

export interface getMessagesResponse {
  success: boolean;
  data: chatType[];
}
