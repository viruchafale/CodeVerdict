"use client";

import { useMemo, useState } from "react";

import { ProblemTable } from "@/components/ProblemTable";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { problems } from "@/lib/mockData";

const levels = ["All", "Easy", "Medium", "Hard"] as const;
const tags = ["All", "Array", "DP", "Graph", "String", "Math"] as const;

export default function ProblemsPage() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<(typeof levels)[number]>("All");
  const [tag, setTag] = useState<(typeof tags)[number]>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return problems.filter((problem) => {
      const matchesQuery = problem.title.toLowerCase().includes(query.toLowerCase());
      const matchesDifficulty = difficulty === "All" || problem.difficulty === difficulty;
      const matchesTag = tag === "All" || problem.tags.includes(tag);
      return matchesQuery && matchesDifficulty && matchesTag;
    });
  }, [difficulty, query, tag]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="page-shell py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Problems</h1>
        <p className="mt-1 text-sm text-muted">Classic table-first browsing with quick filters.</p>
      </div>

      <div className="panel mb-4 p-4">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search problem title"
          />
          <Select
            value={tag}
            onValueChange={(value) => {
              setTag(value as (typeof tags)[number]);
              setPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              {tags.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {levels.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setDifficulty(item);
                setPage(1);
              }}
              className={`rounded border px-3 py-1.5 text-sm ${
                difficulty === item ? "border-brand bg-brand text-white" : "border-line bg-white text-text"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <ProblemTable problems={pageItems} startIndex={(currentPage - 1) * pageSize} />

      <div className="mt-4 flex flex-col items-center gap-3">
        <p className="text-sm text-muted">
          {filtered.length === 0
            ? "No problems found."
            : `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filtered.length)} of ${filtered.length}`}
        </p>

        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink isActive={pageNumber === currentPage} onClick={() => setPage(pageNumber)}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
