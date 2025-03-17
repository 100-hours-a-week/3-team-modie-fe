import { useMeetStatusInfo } from "./useMeetStatusInfo";
import menuIcon from "../../assets/menu.svg";
import exitIcon from "../../assets/exit.svg";
import { meetType } from "../types/meetType";

/**
 * 모임의 진행 여부, 유저의 롤에 따라 보여줄 아이콘을 관리합니다.
 * @author 희진
 */

export function useMeetStatus(meetStatus?: meetType["data"]) {
  const status = useMeetStatusInfo(meetStatus);
  if (!status) return null;
  if (!status.isOwner && !status.isMember) return null;

  if (status.isEnded) return <img src={menuIcon} alt="menuIcon" />;
  if (status.isBeforeMeet) {
    return status.isOwner ? (
      <img src={menuIcon} alt="menuIcon" />
    ) : (
      <img src={exitIcon} alt="exitIcon" />
    );
  }
  return status.isOwner ? <img src={menuIcon} alt="menuIcon" /> : null;
}
