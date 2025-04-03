import cn from "../../utils/cn.ts";
import SubmitBtn from "../../common/components/SubmitBtn.tsx";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../assets/logo.svg";

export default function MeetDone() {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen bg-white",
        "justify-between items-center px-[2rem] gap-[6rem] pb-[5rem]"
      )}
    >
      {/* 콘텐츠 영역 */}
      <div className="self-stretch flex-1 pt-[2rem] pb-[21rem] flex flex-col justify-center items-center gap-[5rem]">
        {/* 로고 */}
        <div className="flex justify-center items-center w-[25.6rem] h-fit px-2 py-16 flex-shrink-0">
          <img
            src={logoIcon}
            alt="logo"
            className="w-[25rem] h-[9.3rem] ml-4"
          />
        </div>

        {/* 안내 메시지 */}
        <div
          className={cn(
            "text-center",
            "text-gray42 text-Title font-pretendard"
          )}
        >
          <br />
          모임 끝
          <br />
          모임이 종료되었습니다!
        </div>
      </div>

      {/* 저장 버튼 - 이벤트 핸들러 위치 변경 */}
      <div
        className="absolute bottom-0 w-full flex justify-center pb-6"
        onClick={() => navigate("/")}
      >
        <SubmitBtn active={true} description="목록으로 돌아가기" />
      </div>
    </div>
  );
}
