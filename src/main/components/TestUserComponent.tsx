import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../services/fetchUser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

  return <div>User name: {data?.name}</div>;
}
