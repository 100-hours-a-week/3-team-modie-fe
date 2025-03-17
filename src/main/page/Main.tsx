// import TestUserComponent from "../components/TestUserComponent";
import Header from "../../common/components/Header";
import ToastMsg from "../../common/components/ToastMsg";
import SubmitBtn from "../../common/components/SubmitBtn";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* tanstack-query 테스트용도
      <TestUserComponent /> */}
      <Header isMainPage />

      <div className="fixed bottom-29 w-full flex justify-center ">
        <ToastMsg active={true} description="토스트 메세지 컴포넌트" />
      </div>

      <div className="fixed bottom-0 w-full flex justify-center pb-6">
        <SubmitBtn active={true} description="다음" />
      </div>
    </div>
  );
}
