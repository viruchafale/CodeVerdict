"use client";

import { useMemo, useState } from "react";

import { LeaderboardTable } from "@/components/LeaderboardTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { leaderboard } from "@/lib/mockData";

export default function LeaderboardPage() {
  const [mode, setMode] = useState("all-time");

  const users = useMemo(() => {
    if (mode === "this-week") {
      return leaderboard.map((user, index) => ({
        ...user,
        rank: index + 1,
        solved: Math.max(10, user.solved - 300),
        score: Math.max(1000, user.score - 7200)
      }));
    }

    if (mode === "this-month") {
      return leaderboard.map((user, index) => ({
        ...user,
        rank: index + 1,
        solved: Math.max(40, user.solved - 160),
        score: Math.max(2200, user.score - 4300)
      }));
    }

    return leaderboard;
  }, [mode]);

  return (
    <div className="page-shell py-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="mt-1 text-sm text-muted">Compact rankings, just like a classic programming judge.</p>
      </div>

      <Tabs value={mode} onValueChange={setMode}>
        <TabsList className="mb-4">
          <TabsTrigger value="all-time">All Time</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
        </TabsList>
      </Tabs>

      <LeaderboardTable users={users} />
    </div>
  );
}
