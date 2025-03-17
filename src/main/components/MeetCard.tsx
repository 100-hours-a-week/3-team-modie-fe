import { useNavigate } from "react-router-dom";
import locationIcon from "../../assets/location.svg";
import clockIcon from "../../assets/clock.svg";
import memeberIcon from "../../assets/member.svg";
import payedIcon from "../../assets/payed.svg";
import MeetTag from "./MeetTag.tsx";

interface MeetCardProps {
  meetKey: number;
  meetIntro: string;
  type: string;
  meetDt: string;
  address: string;
  addressDetail: string;
  cost: boolean;
  memberCount: number;
  memberLimit: number;
  ownerName: string;
}

export default function MeetCard({
  meetKey,
  meetIntro,
  type,
  meetDt,
  address,
  addressDetail,
  cost,
  memberCount,
  memberLimit,
  ownerName,
}: MeetCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (meetKey) {
      navigate(`/${meetKey}`);
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} (${dayOfWeek}) ${hours}:${minutes}`;
  };

  return (
    <div
      className="flex w-full p-4 px-[1rem] flex-col justify-center items-start gap-2 rounded-[1rem] border border-[#BDBDBD] bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      onClick={handleCardClick}
    >
      <div className="flex w-full h-fit items-center justify-between">
        <div className="flex h-fit gap-2">
          <MeetTag name={type} />
          <MeetTag name="모집중" />
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
        {meetIntro}
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
          {formatDate(meetDt)}
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
