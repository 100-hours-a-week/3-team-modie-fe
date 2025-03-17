import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../services/fetchUser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * tanstack-query와 test 코드의 테스트를 위한 더미 컴포넌트입니다.
 * 추후 삭제 예정!
 * @author 희진
 */

export default function TestUserComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (isLoading) {
    return (
      <div>
        <Skeleton height={24} width={120} />
      </div>
    );
  }

  if (error) return <div>Error!</div>;

  return <div className="text-Black display">User name: {data?.name}</div>;
}
