import { Badge } from "@/components/ui/badge";
import { Verdict } from "@/lib/mockData";

const verdictStyles: Record<Verdict, string> = {
  Accepted: "border-green-200 bg-green-50 text-green-700",
  "Wrong Answer": "border-red-200 bg-red-50 text-red-700",
  TLE: "border-amber-200 bg-amber-50 text-amber-700",
  MLE: "border-violet-200 bg-violet-50 text-violet-700",
  "Runtime Error": "border-orange-200 bg-orange-50 text-orange-700",
  "Compile Error": "border-slate-200 bg-slate-100 text-slate-700"
};

export function VerdictBadge({ verdict, className }: { verdict: Verdict; className?: string }) {
  return <Badge className={`${verdictStyles[verdict]} ${className ?? ""}`}>{verdict}</Badge>;
}
