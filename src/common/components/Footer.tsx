import SubmitBtn from "./SubmitBtn";
import ToastMsg from "./ToastMsg";

export default function Footer() {
  return (
    <>
      <footer className="fixed bottom-0 w-full flex flex-col justify-center items-center gap-1 py-8 mx-auto">
        <ToastMsg active={true} description="토스트 메세지 컴포넌트" />
        <SubmitBtn active={true} description="다음" />
      </footer>
    </>
  );
}
