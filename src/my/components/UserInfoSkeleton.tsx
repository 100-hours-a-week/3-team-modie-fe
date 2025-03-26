import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UserInfoSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center gap-[1.2rem] self-stretch pt-[1.6rem] pb-[2rem]">
      <Skeleton
        circle
        width="8rem"
        height="8rem"
        baseColor="#e0e0e0"
        highlightColor="#f5f5f5"
      />
      <Skeleton
        width="12rem"
        height="2rem"
        borderRadius="0.5rem"
        baseColor="#e0e0e0"
        highlightColor="#f5f5f5"
      />
    </div>
  );
}
