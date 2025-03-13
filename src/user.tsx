// src/components/User.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./fetch-user";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // 스타일 import 꼭 필요!

export default function User() {
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

  return <div>User name: {data?.name}</div>;
}
