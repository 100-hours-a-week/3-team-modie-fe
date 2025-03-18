import locationIcon from "../../assets/location.svg";
import clockIcon from "../../assets/clock.svg";
import memeberIcon from "../../assets/member.svg";
import payedIcon from "../../assets/payed.svg";
import MeetTag from "./MeetTag.tsx";
import cn from "../../utils/cn.ts";
import { meetItem } from "../types/meetItem.ts";
import { formatDate } from "../../utils/formatDate.ts";
import { useMeetCard } from "../hooks/useMeetCardData.tsx"; // meetItem 타입 import

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
  const { handleCardClick, isRecruitingActive } = useMeetCard({
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
          <img
            src={payedIcon}
            className="w-[2.4rem] h-[2.4rem] justify-center align-middle gap-[1rem]"
            alt="정산 여부 아이콘"
          />
        )}
      </div>

      <div className="text-gray42 text-Body1 font-bold truncate w-full text--">
        {meetIntro} {/* meetIntro → intro */}
      </div>

      <div className="flex h-fit items-center gap-2 self-stretch">
        <img
          src={locationIcon}
          className="w-[2.4rem] h-[2.4rem]"
          alt="위치 아이콘"
        />
        <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
          {addressDetail} ({address})
        </div>
      </div>

      <div className="flex h-fit items-center gap-2 self-stretch">
        <img
          src={clockIcon}
          className="w-[2.4rem] h-[2.4rem]"
          alt="시간아이콘"
        />
        <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
          {formatDate(meetAt)} {/* meetDt → meetAt */}
        </div>
      </div>

      <div className="flex h-fit items-center gap-2 self-stretch">
        <img
          src={memeberIcon}
          className="w-[2.4rem] h-[2.4rem] px-0.5 py-0.5"
          alt="맴버 아이콘"
        />
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
