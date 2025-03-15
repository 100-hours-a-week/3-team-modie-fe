import { meetType } from "./meetType";

export interface headerType {
  title?: string;
  meetStatus?: meetType["data"];
  isMainPage?: boolean;
}
