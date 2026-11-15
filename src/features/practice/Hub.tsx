import { useStore } from "../../lib/store";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ARCHIVE, LEARN, practiceItems } from "../../components/nav";
import type { NavItem } from "../../components/nav";
import { ICON, PageHeader } from "../../components/ui";

function Rows({ items, illustrated = false }: { items: NavItem[]; illustrated?: boolean }) {
  return (
    <ul className={illustrated ? "mh-practice-grid" : "rows border-y border-rule"}>
      {items.map((n) => {
        const Icon = n.icon;
        return (
          <li key={n.to} data-mode={n.to.slice(1)}>
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
  const { lang } = useStore();
  return (
    <div>
      <PageHeader title="Übungen" subtitle="Wähle, wie du das Gelernte anwenden möchtest." />
      <Rows items={practiceItems(lang.tonePractice)} illustrated={lang.code === "zh"} />
    </div>
  );
}

/** Everything that is not in the bottom bar. */
export function More() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Mein Lernbereich" />
      <Rows items={[LEARN[2], ...ARCHIVE]} />
    </div>
  );
}
