import Header from "../../common/components/Header";
import ToastMsg from "../../common/components/ToastMsg";
import SubmitBtn from "../../common/components/SubmitBtn";

export default function MeetCreate() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Header title="모임 생성" />

      <div className="flex justify-center mt-auto mb-29">
        <ToastMsg active={true} description="토스트 메세지 컴포넌트" />
      </div>

      <div className="fixed bottom-0 w-full flex justify-center pb-6">
        <SubmitBtn active={true} description="다음" />
      </div>
    </div>
  );
}
