interface ProgressBarProps {
  width: number;
}

/**
 * 모임 생성시 진행상황을 나타내는 프로그레스바 컴포넌트
 * @author 희진
 */

export default function ProgressBar({ width }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 h-1.5 dark:bg-grayEe mt-1">
      <div
        className="h-1.5 dark:bg-primaryDark2"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
