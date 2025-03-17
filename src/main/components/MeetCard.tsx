import locationIcon from "../../assets/location.svg";
import clockIcon from "../../assets/clock.svg";
import memeberIcon from "../../assets/member.svg";
import payedIcon from "../../assets/payed.svg";
import MeetTag from "./MeetTag.tsx";

export default function MeetCard() {
  return (
    <div className="flex w-full p-4 px-[1rem] flex-col justify-center items-start gap-2 rounded-[1rem] border border-[#BDBDBD] bg-white shadow-lg">
      <div className="flex w-full h-fit  items-center justify-between">
        <div className="flex h-fit gap-2">
          <MeetTag name="택시팟" />
          <MeetTag name="모집중" />
        </div>
        <img
          src={payedIcon}
          className="w-[2.4rem] h-[2.4rem] justify-center align-middle gap-[1rem]"
          alt="정산 여부 아이콘"
        />
      </div>

      <div className="text-gray42 text-Body1 font-bold truncate w-full text--">
        방장의 코멘트 한줄 한줄
      </div>

      <div className="flex h-fit items-center gap-2 self-stretch">
        <img
          src={locationIcon}
          className="w-[2.4rem] h-[2.4rem]"
          alt="위치 아이콘"
        />
        <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
          문 앞 (제주 제주시 월성로 4길)
        </div>
      </div>

      <div className="flex h-fit items-center gap-2 self-stretch">
        <img
          src={clockIcon}
          className="w-[2.4rem] h-[2.4rem]"
          alt="시간아이콘"
        />
        <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
          23.07.07 (일) 13:00
        </div>
      </div>

      <div className="flex h-fit items-center gap-2 self-stretch">
        <img
          src={memeberIcon}
          className="w-[2.4rem] h-[2.4rem] px-0.5 py-0.5"
          alt="맴버 아이콘"
        />
        <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
          2/3 명
        </div>
      </div>

      <hr />

      <div className="text-gray75 text-Body3 font-pretendard truncate w-full text--">
        {" "}
        김박박즐
      </div>
    </div>
  );
}
