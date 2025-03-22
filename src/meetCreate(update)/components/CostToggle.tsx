interface CostToggleProps {
  hasCost: boolean;
  setHasCost: (value: boolean) => void;
}

export default function CostToggle({ hasCost, setHasCost }: CostToggleProps) {
  return (
    <div className="w-full">
      <div className="text-Body1 font-bold mb-2">비용이 발생하나요?</div>
      <div className="flex w-full text-center">
        {/* 네 버튼 */}
        <button
          onClick={() => setHasCost(true)}
          className={`flex-1 py-3 text-Body2 font-bold ${
            hasCost
              ? "text-primaryDark2 border-2 border-primaryDark2 bg-white rounded-l-2xl"
              : "text-gray42 shadow-xs rounded-l-2xl"
          }`}
        >
          네
        </button>

        {/* 아니요 버튼 */}
        <button
          onClick={() => setHasCost(false)}
          className={`flex-1 py-3 text-Body2 font-bold ${
            !hasCost
              ? "text-primaryDark2 border-2 border-primaryDark2 bg-white rounded-r-2xl"
              : "text-gray42 shadow-xs rounded-r-2xl"
          }`}
        >
          아니요
        </button>
      </div>
    </div>
  );
}
