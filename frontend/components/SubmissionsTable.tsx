"use client";

import Link from "next/link";
import { useState } from "react";

import { CodeEditor } from "@/components/CodeEditor";
import { VerdictBadge } from "@/components/VerdictBadge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Problem, Submission } from "@/lib/mockData";

export function SubmissionsTable({ submissions, problems }: { submissions: Submission[]; problems: Problem[] }) {
  const [selected, setSelected] = useState<Submission | null>(null);
  const problemMap = new Map(problems.map((problem) => [problem.id, problem]));

  return (
    <>
      <div className="panel overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Verdict</TableHead>
              <TableHead>Runtime</TableHead>
              <TableHead>Memory</TableHead>
              <TableHead>Submitted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id} className="cursor-pointer" onClick={() => setSelected(submission)}>
                <TableCell className="text-muted">#{submission.id}</TableCell>
                <TableCell>
                  <Link
                    href={`/problems/${submission.problemId}`}
                    className="font-medium text-brand hover:underline"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {problemMap.get(submission.problemId)?.title ?? submission.problemId}
                  </Link>
                </TableCell>
                <TableCell className="text-muted">{submission.language}</TableCell>
                <TableCell>
                  <VerdictBadge verdict={submission.verdict} />
                </TableCell>
                <TableCell className="text-muted">{submission.runtime} ms</TableCell>
                <TableCell className="text-muted">{submission.memory} KB</TableCell>
                <TableCell className="text-muted">{submission.submittedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>Submission #{selected.id}</DialogTitle>
                <DialogDescription>
                  {selected.language} · {selected.runtime} ms · {selected.memory} KB
                </DialogDescription>
              </DialogHeader>
              <CodeEditor language={selected.language} value={selected.code} height="60vh" readOnly />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
