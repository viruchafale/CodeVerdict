import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeaderboardUser } from "@/lib/mockData";

export function LeaderboardTable({ users }: { users: LeaderboardUser[] }) {
  return (
    <div className="panel overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Solved</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.rank}
              className={user.rank === 1 ? "bg-amber-50" : user.rank === 2 ? "bg-slate-100" : user.rank === 3 ? "bg-orange-50" : ""}
            >
              <TableCell className="font-semibold">#{user.rank}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{user.username.slice(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.username}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted">{user.solved}</TableCell>
              <TableCell className="text-muted">{user.score}</TableCell>
              <TableCell className="text-muted">{user.lastActive}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
