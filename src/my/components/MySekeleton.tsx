import Skeleton from "react-loading-skeleton";
import cn from "../../utils/cn";
import "react-loading-skeleton/dist/skeleton.css";

export default function AccountCardSkeleton() {
  return (
    <div
      className={cn(
        "rounded-[1.2rem] bg-white flex flex-col",
        "w-[calc(100%-4rem)] max-w-[40rem] h-fit",
        "px-[2.4rem] py-[2rem] mx-[2rem]"
      )}
    >
      <div className="flex w-full justify-between items-center mb-[1.6rem]">
        <Skeleton width={60} height={20} />
        <Skeleton width={50} height={20} />
      </div>
      <Skeleton height={20} width={`80%`} />
      <Skeleton height={20} width={`60%`} className="mt-2" />
    </div>
  );
}
