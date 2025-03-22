import LocationIcon from "../../assets/location.svg?react";
import ClockIcon from "../../assets/clock.svg?react";
import MemeberIcon from "../../assets/member.svg?react";
import CostIcon from "../../assets/cost.svg?react";
import MeetTag from "./MeetTag.tsx";
import cn from "../../utils/cn.ts";
import { meetItem } from "../types/meetItem.ts";
import { formatDate } from "../../utils/formatDate.ts";
import { useMeetCardData } from "../hooks/useMeetCardData.tsx"; // meetItem 타입 import

export default function MeetCard({
  meetId,
  meetIntro,
  meetType,
  meetAt,
  address,
  addressDetail,
  cost,
  memberCount,
  memberLimit,
  ownerName,
}: meetItem) {
  const { handleCardClick, isRecruitingActive } = useMeetCardData({
    meetId,
    meetAt,
    memberCount,
    memberLimit,
  });

  return (
    <div
      className={cn(
        "flex w-full p-4 px-[1rem] flex-col justify-center items-start gap-2",
        "rounded-[1rem] border border-grayBd bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      )}
      onClick={handleCardClick}
    >
      <div className="flex w-full h-fit min-h-[2.4rem] items-center justify-between">
        <div className="flex h-fit gap-2">
          <MeetTag name={meetType} />
          {isRecruitingActive() && <MeetTag name="모집중" />}
        </div>
        {cost && (
          <CostIcon className="w-[2.4rem] h-[2.4rem] justify-center align-middle gap-[1rem] text-gray75" />
        )}
      </div>

      <div className="text-gray42 text-Body1 font-bold truncate w-full text--">
        {meetIntro}
      </div>

      <div className="flex h-fit items-center gap-2 self-stretch">
        <LocationIcon className="w-[2.4rem] h-[2.4rem] text-gray75" />
        <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
          {addressDetail} ({address})
        </div>
      </div>

      <div className="flex h-fit items-center gap-2 self-stretch">
        <ClockIcon className="w-[2.4rem] h-[2.4rem] text-gray75" />
        <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
          {formatDate(meetAt)}
        </div>
      </div>

      <div className="flex h-fit items-center gap-2 self-stretch">
        <MemeberIcon className="w-[2.4rem] h-[2.4rem] px-0.5 py-0.5 text-gray75" />
        <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
          {memberCount}/{memberLimit} 명
        </div>
      </div>

      <hr />

      <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
        {ownerName}
      </div>
    </div>
  );
}
