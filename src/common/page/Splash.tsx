import cn from "../../utils/cn.ts";
import logoIcon from "../../assets/logo.svg";

export default function Splash() {
  return (
    <div
      className={cn(
        "flex flex-col w-screen h-screen bg-white",
        "justify-between items-center px-[2rem] gap-[6rem] pb-[5rem]"
      )}
    >
      <div className="self-stretch flex-1 pt-[2rem] pb-[21rem] flex flex-col justify-center items-center gap-[5rem]">
        <div className="flex justify-center items-center w-[25.6rem] h-fit px-2 py-16 flex-shrink-0">
          <img
            src={logoIcon}
            alt="logo"
            className="w-[25rem] h-[9.3rem] ml-4"
          />
        </div>

        <div className={cn("text-center", "text-gray21 text-Title font-bold")}>
          <br />
          같이 하면 더 편하고, 싸고,
          <br />
          재미있어지니까! 🙌🏻
        </div>
      </div>
    </div>
  );
}
