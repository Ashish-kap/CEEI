import { Skeleton } from "@/components/ui/skeleton";
import { UserCard } from "@/component/user-card";
import { User } from "@/features/users/usersSlice";

type UsersListProps = {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
};

export function UsersList({ users, status }: UsersListProps) {
  if (status === "loading") {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            data-testid="skeleton"
            key={i}
            className="h-[200px] w-full rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">
          Failed to load users. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
