import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ARCHIVE, LEARN, PRACTICE } from "../components/nav";
import type { NavItem } from "../components/nav";
import { ICON, PageHeader } from "../components/ui";

function Rows({ items }: { items: NavItem[] }) {
  return (
    <ul className="rows border-y border-rule">
      {items.map((n) => {
        const Icon = n.icon;
        return (
          <li key={n.to}>
            <Link to={n.to} className="group flex min-h-[64px] items-center gap-4 py-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-ink text-paper">
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{n.label}</span>
                <span className="block text-sm text-dim">{n.hint}</span>
              </span>
              <ArrowRight {...ICON} aria-hidden className="shrink-0 text-dim transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Overview of all practice modes (bottom-bar destination on small screens). */
export function Practice() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Üben" subtitle="Sechs Wege, das Gelernte anzuwenden." />
      <Rows items={PRACTICE} />
    </div>
  );
}

/** Everything that is not in the bottom bar. */
export function More() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Mehr" />
      <Rows items={[LEARN[2], ...ARCHIVE]} />
    </div>
  );
}
