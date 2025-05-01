import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/features/users/usersSlice";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card data-testid="user-card" className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>@{user.username}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">
          <a
            href={`mailto:${user.email}`}
            className="text-primary hover:underline"
          >
            {user.email}
          </a>
        </p>
        <p className="text-sm">{user.phone}</p>
        <div className="text-xs text-muted-foreground">
          <p>{user.company.name}</p>
          <p>{user.address.city}</p>
        </div>
      </CardContent>
    </Card>
  );
}
