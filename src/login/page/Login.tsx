import logoIcon from "../../assets/logo.svg";

export default function Login() {
  const handleLogin = () => {
    console.log("login click!!");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center w-full">
      <div className="flex justify-center items-center w-fit h-fit px-2 py-16 flex-shrink-0">
        <img src={logoIcon} alt="logo" className="w-[25rem] h-[9.3rem] ml-4" />
      </div>
      <div className="text-Title font-bold text-center">
        같이 하면 더 편하고, 싸고, <br />
        재밌어지니까! 🙌🏻
      </div>
      <button
        onClick={handleLogin}
        className="flex items-center justify-center w-[32.8rem] h-[5rem] bg-[#FEE500] text-black font-bold text-base rounded-md shadow-md mt-[10rem] mb-[5rem]"
      >
        카카오 로그인
      </button>
    </div>
  );
}
