import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Difficulty, Problem } from "@/lib/mockData";

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "border-green-200 bg-green-50 text-green-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Hard: "border-red-200 bg-red-50 text-red-700"
};

export function ProblemTable({ problems, startIndex = 0 }: { problems: Problem[]; startIndex?: number }) {
  return (
    <div className="panel overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Acceptance</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem, index) => (
            <TableRow key={problem.id}>
              <TableCell className="text-muted">{startIndex + index + 1}</TableCell>
              <TableCell>
                <Link href={`/problems/${problem.id}`} className="font-medium text-brand hover:underline">
                  {problem.title}
                </Link>
              </TableCell>
              <TableCell>
                <Badge className={difficultyStyles[problem.difficulty]}>{problem.difficulty}</Badge>
              </TableCell>
              <TableCell className="text-muted">{problem.acceptance}%</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {problem.tags.map((tag) => (
                    <Badge key={tag} className="border-slate-200 bg-slate-50 text-slate-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className={problem.solved ? "text-green-700" : "text-slate-400"}>{problem.solved ? "✓" : "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
