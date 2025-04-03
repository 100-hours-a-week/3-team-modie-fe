import { useNavigate } from "react-router-dom";
import createButton from "../../assets/create.svg";

export default function CreateButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/meet/create/type");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 ml-165 w-[5.6rem] h-[5.6rem] bg-primaryDark2 rounded-full shadow-lg flex items-center justify-center z-20 cursor-pointer"
      aria-label="모임 생성하기"
    >
      <img
        className="w-[2.4rem] h-[2.4rem]"
        src={createButton}
        alt="게시글 생성 버튼"
      />
    </button>
  );
}
