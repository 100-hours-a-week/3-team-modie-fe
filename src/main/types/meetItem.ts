import { meetType } from "../../common/types/meetType.ts";

/**
 * 모임 목록 페이지 API 응답울 정의합니다.
 * @author 상혁
 */

// meetType['data']에서 필요한 속성만 선택
export interface meetItem
  extends Pick<
    meetType,
    | "meetId"
    | "meetIntro"
    | "meetType"
    | "meetAt"
    | "address"
    | "addressDetail"
    | "memberLimit"
    | "ownerName"
  > {
  cost: boolean;
  memberCount: number;
}
