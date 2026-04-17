"use client";

import { useMemo, useState } from "react";

import { CodeEditor } from "@/components/CodeEditor";
import { VerdictBadge } from "@/components/VerdictBadge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { languages, problems, submissions, type Language, type Verdict } from "@/lib/mockData";

type Result =
  | { verdict: "Accepted"; runtime: number; memory: number }
  | { verdict: Exclude<Verdict, "Accepted">; failedCase: number; expected: string; got: string };

const testCases = [
  { id: "case-1", label: "Case 1", input: "5\n1 2 3 4 5\n3", output: "9", editable: false },
  { id: "case-2", label: "Case 2", input: "4\n8 1 6 2\n2", output: "8", editable: false },
  { id: "custom", label: "Custom Input", input: "3\n5 5 5\n1", output: "15", editable: true }
] as const;

export default function ProblemDetailPage({ params }: { params: { id: string } }) {
  const problem = problems.find((item) => item.id === params.id);

  if (!problem) {
    return (
      <div className="page-shell py-6">
        <div className="panel p-6">
          <h1 className="text-xl font-semibold">Problem not found</h1>
        </div>
      </div>
    );
  }

  const [language, setLanguage] = useState<Language>("Python 3");
  const [code, setCode] = useState(problem.starterCode["Python 3"]);
  const [customInput, setCustomInput] = useState<string>(testCases[2].input);
  const [result, setResult] = useState<Result | null>(null);

  const recentSubmissions = useMemo(
    () => submissions.filter((submission) => submission.problemId === problem.id).slice(0, 5),
    [problem.id]
  );

  const onLanguageChange = (value: string) => {
    const nextLanguage = value as Language;
    setLanguage(nextLanguage);
    setCode(problem.starterCode[nextLanguage]);
  };

  const onSubmit = () => {
    if (code.includes("return") && code.length % 2 === 0) {
      setResult({ verdict: "Accepted", runtime: 47, memory: 14120 });
      return;
    }

    setResult({ verdict: "Wrong Answer", failedCase: 2, expected: "8", got: "7" });
  };

  return (
    <div className="page-shell py-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)]">
        <section className="panel p-4">
          <div className="border-b border-line pb-3">
            <h1 className="text-2xl font-semibold">{problem.title}</h1>
            <p className="mt-1 text-sm text-muted">
              Difficulty: <span className="font-medium text-text">{problem.difficulty}</span>
            </p>
          </div>

          <Tabs defaultValue="description" className="mt-4">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="constraints">Constraints</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <div className="space-y-4 text-sm leading-6 text-text">
                <p>{problem.description}</p>
                <div>
                  <h2 className="font-semibold">Input</h2>
                  <p className="mt-1 text-muted">{problem.inputFormat}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Output</h2>
                  <p className="mt-1 text-muted">{problem.outputFormat}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples">
              <div className="space-y-4">
                {problem.examples.map((example, index) => (
                  <div key={index} className="rounded border border-line p-3">
                    <h2 className="font-semibold">Example {index + 1}</h2>
                    <div className="mt-3 grid gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase text-slate-500">Input</div>
                        <pre className="mt-1 overflow-x-auto rounded bg-slate-50 p-3 text-sm text-slate-700">{example.input}</pre>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase text-slate-500">Output</div>
                        <pre className="mt-1 overflow-x-auto rounded bg-slate-50 p-3 text-sm text-slate-700">{example.output}</pre>
                      </div>
                      <p className="text-sm text-muted">{example.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="constraints">
              <ul className="space-y-2 text-sm text-muted">
                {problem.constraints.map((constraint) => (
                  <li key={constraint} className="rounded border border-line bg-slate-50 px-3 py-2">
                    {constraint}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="submissions">
              <div className="overflow-hidden rounded border border-line">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Verdict</TableHead>
                      <TableHead>Runtime</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>#{submission.id}</TableCell>
                        <TableCell>{submission.language}</TableCell>
                        <TableCell>
                          <VerdictBadge verdict={submission.verdict} />
                        </TableCell>
                        <TableCell>{submission.runtime} ms</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
            {problem.tags.map((tag) => (
              <span key={tag} className="rounded border border-line bg-slate-50 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="panel p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-full md:w-52">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button variant="outline">Run Code</Button>
                <Button onClick={onSubmit}>Submit</Button>
              </div>
            </div>

            <div className="mt-4">
              <CodeEditor language={language} value={code} onChange={setCode} height="calc(100vh - 280px)" />
            </div>
          </div>

          <div className="panel p-4">
            <h2 className="section-title">Test Cases</h2>
            <Tabs defaultValue="case-1" className="mt-3">
              <TabsList>
                {testCases.map((item) => (
                  <TabsTrigger key={item.id} value={item.id}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {testCases.map((item) => (
                <TabsContent key={item.id} value={item.id}>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <div className="mb-1 text-xs font-semibold uppercase text-slate-500">stdin</div>
                      <textarea
                        value={item.editable ? customInput : item.input}
                        onChange={(event) => item.editable && setCustomInput(event.target.value)}
                        readOnly={!item.editable}
                        className="min-h-32 w-full rounded border border-line bg-slate-50 p-3 font-mono text-sm outline-none"
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-semibold uppercase text-slate-500">Expected Output</div>
                      <pre className="min-h-32 rounded border border-line bg-slate-50 p-3 text-sm">{item.output}</pre>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {result && (
            <div className="panel p-4">
              <div className="flex items-center gap-3">
                <h2 className="section-title">Verdict</h2>
                <VerdictBadge verdict={result.verdict} />
              </div>

              {result.verdict === "Accepted" ? (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    Runtime: <span className="font-semibold">{result.runtime} ms</span>
                  </div>
                  <div className="rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    Memory: <span className="font-semibold">{result.memory} KB</span>
                  </div>
                </div>
              ) : (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    Failed test case: <span className="font-semibold">#{result.failedCase}</span>
                  </div>
                  <div className="rounded border border-line bg-slate-50 p-3 text-sm">
                    <div>Expected: {result.expected}</div>
                    <div className="mt-2">Got: {result.got}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
