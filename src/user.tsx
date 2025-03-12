// src/components/User.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./fetch-user";

export default function User() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"], // 해당 쿼리의 고유 키
    queryFn: fetchUser, // 캐시 없으면 데이터를 가져올 함수 실행
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>User name: {data?.name}</div>;
}
