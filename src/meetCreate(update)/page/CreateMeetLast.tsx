import Header from "../../common/components/Header";
import ProgressBar from "../../common/components/ProgressBar";
import KakaoMap from "../../meetDetail/components/KakaoMap";
import CategoryBox from "../components/CategoryBox";
import MemberIcon from "../../assets/member.svg?react";
import { useCreateMeetStore } from "../store/useCreateMeetStore";
import SubmitBtn from "../../common/components/SubmitBtn";
import { useCreateMeetSubmit } from "../hooks/useCreateMeetSubmit";
import ToastMsg from "../../common/components/ToastMsg";
import { getCategoryIcon } from "../../utils/getCategoryIcon";

export default function CreateMeetLast() {
  const { meetInfo, isEditMode } = useCreateMeetStore();
  const { handleSubmit, isToastVisible, toastMessage } = useCreateMeetSubmit();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="최종 확인" />
      <ProgressBar width={100} />

      <main className="flex-1 px-6 pb-[12rem] mt-5">
        <div className="mb-10 px-6 mt-6 text-Body1 font-bold block text-left">
          모임 설정을 확인해주세요.
        </div>

        <div className="flex items-center mb-11 px-2 gap-11">
          <CategoryBox
            icon={getCategoryIcon(meetInfo?.category ?? "기타")}
            label={
              meetInfo?.category === "기타"
                ? meetInfo?.customType || "기타"
                : meetInfo?.category || "기타"
            }
            width="w-[120px]"
            height="h-[100px]"
          />

          <div className="flex flex-col items-start text-left gap-1">
            <div className="text-Body2 text-black">{meetInfo.date}</div>
            <div className="text-Body1 font-bold">
              {meetInfo?.time?.hour}:{meetInfo?.time?.minute}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <MemberIcon className="text-gray42" />
              <span className="text-Caption1 text-black">
                {meetInfo.memberCount}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mb-11">
          <div className="text-Body1 font-bold mb-2">모임 장소</div>
          <KakaoMap address={meetInfo?.address} />
          <div className="mt-4 text-Body2 text-gray42 font-bold break-words whitespace-pre-wrap w-full">
            {meetInfo?.address}
          </div>
          <p className="mt-4 text-Body2 text-gray75 break-words whitespace-pre-wrap w-full">
            {meetInfo?.addressDescription}
          </p>
        </div>

        <div className="w-full mb-11">
          <div className="text-Body1 font-bold mb-2">모임 소개글</div>
          <p className="mt-4 text-Body2 text-gray75 break-words whitespace-pre-wrap w-full">
            {meetInfo?.intro}
          </p>
        </div>

        <div className="w-full">
          {(meetInfo.cost ?? 0) > 0 ? (
            <>
              <div className="text-Body1 font-bold mb-2">비용이 발생해요</div>
              <p className="mt-4 text-Body2 text-gray75 break-words whitespace-pre-wrap w-full">
                예상 비용 {(meetInfo.cost ?? 0).toLocaleString()} 원
              </p>
            </>
          ) : (
            <div className="text-Body1 font-bold mb-2">
              비용이 발생하지 않아요
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-29 w-full flex justify-center">
        <ToastMsg active={isToastVisible} description={toastMessage} />
      </div>

      <div
        className="fixed bottom-0 w-full px-7 flex justify-center pb-6"
        onClick={handleSubmit}
      >
        <SubmitBtn
          active={true}
          description={isEditMode ? "수정하기" : "생성하기"}
        />
      </div>
    </div>
  );
}
