import Link from "next/link";

import { Button } from "@/components/ui/button";

const links = [
  { href: "/problems", label: "Problems" },
  { href: "/submissions", label: "Submissions" },
  { href: "/leaderboard", label: "Leaderboard" }
];

export function Navbar() {
  return (
    <header className="border-b border-[#184c82] bg-brand text-white">
      <div className="page-shell flex h-12 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold">
            CodeVerdict
          </Link>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/90 hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
            Login
          </Button>
          <Button className="border-white bg-white text-brand hover:bg-slate-100">Register</Button>
        </div>
      </div>
    </header>
  );
}
