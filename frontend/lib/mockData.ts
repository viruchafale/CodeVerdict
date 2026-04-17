export type Difficulty = "Easy" | "Medium" | "Hard";
export type ProblemTag = "Array" | "DP" | "Graph" | "String" | "Math";
export type Language = "C++17" | "Python 3" | "Java 21" | "JavaScript";
export type Verdict =
  | "Accepted"
  | "Wrong Answer"
  | "TLE"
  | "MLE"
  | "Runtime Error"
  | "Compile Error";

export type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: ProblemTag[];
  acceptance: number;
  solved: boolean;
  description: string;
  inputFormat: string;
  outputFormat: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  starterCode: Record<Language, string>;
};

export type Submission = {
  id: number;
  problemId: string;
  language: Language;
  verdict: Verdict;
  runtime: number;
  memory: number;
  code: string;
  submittedAt: string;
};

export type LeaderboardUser = {
  rank: number;
  username: string;
  solved: number;
  score: number;
  lastActive: string;
};

export const languages: Language[] = ["C++17", "Python 3", "Java 21", "JavaScript"];

const starterCode: Record<Language, string> = {
  "C++17": `#include <bits/stdc++.h>
using namespace std;

int solve(vector<int>& nums) {
  return 0;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  return 0;
}
`,
  "Python 3": `def solve(nums: list[int]) -> int:
    return 0


if __name__ == "__main__":
    pass
`,
  "Java 21": `import java.util.*;

public class Main {
    static int solve(List<Integer> nums) {
        return 0;
    }

    public static void main(String[] args) {
    }
}
`,
  JavaScript: `function solve(nums) {
  return 0;
}

function main() {
}

main();
`,
};

const baseProblems: Array<[string, string, Difficulty, ProblemTag[]]> = [
  ["two-sum-stream", "Two Sum Stream", "Easy", ["Array", "Math"]],
  ["balanced-substrings", "Balanced Substrings", "Medium", ["String", "DP"]],
  ["shortest-signal-route", "Shortest Signal Route", "Hard", ["Graph", "DP"]],
  ["matrix-ring-rotation", "Matrix Ring Rotation", "Medium", ["Array", "Math"]],
  ["palindrome-budget", "Palindrome Budget", "Medium", ["String", "DP"]],
  ["island-bridges", "Island Bridges", "Hard", ["Graph", "Array"]],
  ["prefix-energy", "Prefix Energy", "Easy", ["Array", "Math"]],
  ["token-collapse", "Token Collapse", "Medium", ["String", "Array"]],
  ["minimum-jumps-grid", "Minimum Jumps Grid", "Hard", ["Graph", "DP"]],
  ["max-window-average", "Max Window Average", "Easy", ["Array"]],
  ["digit-remix", "Digit Remix", "Medium", ["Math", "String"]],
  ["dependency-order", "Dependency Order", "Medium", ["Graph"]],
  ["equal-partition-lite", "Equal Partition Lite", "Medium", ["DP", "Array"]],
  ["lexicographic-merge", "Lexicographic Merge", "Hard", ["String", "DP"]],
  ["prime-distance", "Prime Distance", "Easy", ["Math"]],
  ["route-parity", "Route Parity", "Medium", ["Graph", "Math"]],
  ["rotating-queue", "Rotating Queue", "Easy", ["Array", "String"]],
  ["weighted-lcs", "Weighted LCS", "Hard", ["DP", "String"]],
  ["spiral-sum-query", "Spiral Sum Query", "Medium", ["Array", "Math"]],
  ["network-propagation", "Network Propagation", "Hard", ["Graph"]]
];

export const problems: Problem[] = baseProblems.map(([id, title, difficulty, tags], index) => ({
  id,
  title,
  difficulty,
  tags,
  acceptance: 44 + ((index * 5) % 41),
  solved: index % 4 === 0,
  description:
    "Given an input sequence, compute the required answer efficiently. Your solution should be correct for all valid cases and fast enough for the full constraints.",
  inputFormat:
    "The first line contains an integer n. The second line contains n space-separated integers. Some tasks include an extra integer k on the last line.",
  outputFormat: "Print a single integer representing the answer.",
  examples: [
    {
      input: "5\n1 2 3 4 5\n3",
      output: "9",
      explanation: "Choosing the best valid middle segment gives the answer 9."
    },
    {
      input: "4\n8 1 6 2\n2",
      output: "8",
      explanation: "The strongest valid pair produces the best score."
    }
  ],
  constraints: [
    "1 <= n <= 2 * 10^5",
    "0 <= a[i] <= 10^9",
    "Time limit: 2 seconds",
    "Memory limit: 256 MB"
  ],
  starterCode: { ...starterCode }
}));

const verdicts: Verdict[] = ["Accepted", "Wrong Answer", "TLE", "Accepted", "Runtime Error", "Compile Error", "MLE"];

export const submissions: Submission[] = Array.from({ length: 30 }, (_, index) => {
  const problem = problems[index % problems.length];
  const language = languages[index % languages.length];
  const verdict = verdicts[index % verdicts.length];

  return {
    id: 5400 + index,
    problemId: problem.id,
    language,
    verdict,
    runtime: verdict === "Accepted" ? 31 + index * 2 : 88 + index * 4,
    memory: 11200 + index * 170,
    code: problem.starterCode[language],
    submittedAt: `2026-04-${String((index % 8) + 1).padStart(2, "0")} ${String(10 + (index % 10)).padStart(2, "0")}:${String((index * 9) % 60).padStart(2, "0")}`
  };
});

export const leaderboard: LeaderboardUser[] = Array.from({ length: 25 }, (_, index) => ({
  rank: index + 1,
  username: [
    "touristx",
    "benq-lite",
    "mathrush",
    "graphmint",
    "arrayfox",
    "dpstorm",
    "stackpilot",
    "stringgrid",
    "heapnote",
    "bitwizard",
    "pathfinder",
    "coderail",
    "rangelab",
    "vortexdev",
    "treescope",
    "nexthop",
    "fastio",
    "probecore",
    "lattice",
    "traceback",
    "splitmerge",
    "primecast",
    "byteforge",
    "flowstate",
    "hashfield"
  ][index],
  solved: 395 - index * 8,
  score: 9800 - index * 160,
  lastActive: `${(index % 10) + 1}m ago`
}));
