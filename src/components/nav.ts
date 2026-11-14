import {
  AudioWaveform,
  BookOpenText,
  CalendarDays,
  ChartNoAxesColumn,
  Headphones,
  Layers,
  LibraryBig,
  Menu,
  Mic,
  NotebookPen,
  Podcast,
  Settings,
  Shapes,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  /** One line shown on the hub pages. */
  hint: string;
  icon: LucideIcon;
  end?: boolean;
}

export const HOME: NavItem = { to: "/heute", label: "Heute", hint: "Dein Tagesblatt", icon: CalendarDays, end: true };

export const LEARN: NavItem[] = [
  { to: "/learn", label: "Wortschatz", hint: "Alle Wörter nach Kategorie und Stufe", icon: LibraryBig },
  { to: "/review", label: "Karten", hint: "Wiederholen und Fehlerheft", icon: Layers },
  { to: "/notebook", label: "Fundstücke", hint: "Eigene Wörter eintragen", icon: NotebookPen },
];

export const PRACTICE: NavItem[] = [
  { to: "/quiz", label: "Quiz", hint: "Schnelle Runden mit zehn Fragen", icon: Target },
  { to: "/listen", label: "Hören", hint: "Sätze hören und verstehen", icon: Headphones },
  { to: "/speak", label: "Sprechen", hint: "Nachsprechen, übersetzen, Rollenspiel", icon: Mic },
  { to: "/tones", label: "Tonlabor", hint: "Die vier Töne nach Gehör erkennen", icon: AudioWaveform },
  { to: "/read", label: "Lesen", hint: "Texte mit Verständnisfragen", icon: BookOpenText },
  { to: "/podcasts", label: "Podcast", hint: "Dialoge mit mitlaufendem Transkript", icon: Podcast },
];

export function practiceItems(tonePractice?: boolean) {
  return PRACTICE.filter(item => item.to !== "/tones" || tonePractice);
}

export const ARCHIVE: NavItem[] = [
  { to: "/chronicle", label: "Chronik", hint: "Dein Lernjahr auf einen Blick", icon: ChartNoAxesColumn },
  { to: "/settings", label: "Einstellungen", hint: "Sprache, Darstellung, Daten", icon: Settings },
];

/** Bottom bar on small screens: at most five destinations. */
export const MOBILE: NavItem[] = [
  HOME,
  LEARN[0],
  LEARN[1],
  { to: "/practice", label: "Üben", hint: "", icon: Shapes },
  { to: "/more", label: "Mehr", hint: "", icon: Menu },
];

/** Which bottom-bar entry is active for a path (hub pages own their children). */
export function mobileOwner(path: string): string {
  if (PRACTICE.some((n) => path.startsWith(n.to)) || path.startsWith("/practice")) return "/practice";
  if ([LEARN[2], ...ARCHIVE].some((n) => path.startsWith(n.to)) || path.startsWith("/more")) return "/more";
  if (path.startsWith("/review")) return "/review";
  if (path.startsWith("/learn") || path.startsWith("/lesson")) return "/learn";
  return HOME.to;
}
