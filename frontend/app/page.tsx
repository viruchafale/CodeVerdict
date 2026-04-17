import Link from "next/link";

import { LandingStats } from "@/components/LandingStats";
import { ProblemTable } from "@/components/ProblemTable";
import { Button } from "@/components/ui/button";
import { problems } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div className="page-shell py-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="space-y-6">
          <div className="panel p-6">
            <h1 className="text-3xl font-semibold text-text">Practice problems the clean way</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              CodeVerdict keeps the interface focused: browse problems, solve them in a familiar editor, inspect verdicts,
              and track rankings in a layout inspired by classic competitive programming sites.
            </p>
            <div className="mt-5 flex gap-3">
              <Link href="/problems">
                <Button>Start Solving</Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="outline">View Leaderboard</Button>
              </Link>
            </div>
          </div>

          <LandingStats
            stats={[
              { label: "Total Problems", value: 1248 },
              { label: "Submissions Today", value: 18342 },
              { label: "Active Users", value: 5216 }
            ]}
          />

          <div>
            <h2 className="section-title mb-3">Featured Problems</h2>
            <ProblemTable problems={problems.slice(0, 6)} />
          </div>
        </section>

        <aside className="space-y-4">
          <div className="panel p-4">
            <h2 className="section-title">Why this layout?</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Simple top navigation</li>
              <li>Dense tables with quick scanning</li>
              <li>Clear split editor and statement view</li>
              <li>Minimal styling, production-friendly code</li>
            </ul>
          </div>

          <div className="panel p-4">
            <h2 className="section-title">Popular tags</h2>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
              <span className="rounded border border-line px-2 py-1">Array</span>
              <span className="rounded border border-line px-2 py-1">DP</span>
              <span className="rounded border border-line px-2 py-1">Graph</span>
              <span className="rounded border border-line px-2 py-1">String</span>
              <span className="rounded border border-line px-2 py-1">Math</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
