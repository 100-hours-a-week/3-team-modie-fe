import { useMeetStatusInfo } from "./useMeetStatusInfo";
import menuIcon from "../../assets/menu.svg";
import exitIcon from "../../assets/exit.svg";
import { meetType } from "../types/meetType";

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
