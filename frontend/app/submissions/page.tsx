"use client";

import { useMemo, useState } from "react";

import { SubmissionsTable } from "@/components/SubmissionsTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { problems, submissions } from "@/lib/mockData";

const verdictOptions = ["All Verdicts", "Accepted", "Wrong Answer", "TLE", "MLE", "Runtime Error", "Compile Error"] as const;
const languageOptions = ["All Languages", "C++17", "Python 3", "Java 21", "JavaScript"] as const;

export default function SubmissionsPage() {
  const [verdict, setVerdict] = useState<(typeof verdictOptions)[number]>("All Verdicts");
  const [language, setLanguage] = useState<(typeof languageOptions)[number]>("All Languages");

  const filtered = useMemo(() => {
    return submissions.filter((submission) => {
      const matchesVerdict = verdict === "All Verdicts" || submission.verdict === verdict;
      const matchesLanguage = language === "All Languages" || submission.language === language;
      return matchesVerdict && matchesLanguage;
    });
  }, [language, verdict]);

  return (
    <div className="page-shell py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Submissions</h1>
        <p className="mt-1 text-sm text-muted">Click any row to view the submitted code.</p>
      </div>

      <div className="panel mb-4 grid gap-3 p-4 md:grid-cols-2">
        <Select value={verdict} onValueChange={(value) => setVerdict(value as (typeof verdictOptions)[number])}>
          <SelectTrigger>
            <SelectValue placeholder="All Verdicts" />
          </SelectTrigger>
          <SelectContent>
            {verdictOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={language} onValueChange={(value) => setLanguage(value as (typeof languageOptions)[number])}>
          <SelectTrigger>
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <SubmissionsTable submissions={filtered} problems={problems} />
    </div>
  );
}
