import {
  BookOpen,
  Layers,
  MessageCircle,
  Mic,
  Target,
  House,
  NotebookPen,
  ChartNoAxesColumnIncreasing,
  LibraryBig,
  UserRound,
  Headphones,
  AudioWaveform,
  Podcast,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Language } from "../languages/types";

export interface NavItem {
  to: string;
  title: string;
  label: string;
  hint: string;
  icon: LucideIcon;
}
const item = (to: string, title: string, icon: LucideIcon, hint = ""): NavItem => ({
  to,
  title,
  label: title,
  icon,
  hint,
});
export const NAVIGATION = [
  item("/heute", "Startseite", House),
  item("/learn", "Vokabeln", BookOpen, "Wortschatz erweitern"),
  item("/review", "Wiederholen", Layers, "Wissen festigen"),
  item("/dialoge", "Dialoge", MessageCircle, "Alltagssituationen üben"),
  item("/speak", "Sprechtraining", Mic, "Aussprache üben"),
  item("/quiz", "Quiz", Target, "Dein Wissen testen"),
  item("/notebook", "Fundstücke", NotebookPen, "Eigene Wörter sammeln"),
  item("/chronicle", "Lernfortschritt", ChartNoAxesColumnIncreasing),
  item("/listen", "Hörtraining", Headphones, "Sätze hören und verstehen"),
  item("/tones", "Tonlabor", AudioWaveform, "Töne nach Gehör erkennen"),
  item("/podcasts", "Hördialoge", Podcast, "Dialoge mit Transkript"),
  item("/read", "Lesetexte", LibraryBig, "Sprache im Kontext verstehen"),
  item("/settings", "Profil", UserRound),
];

/** Used by menus AND direct route guards. Contentless modules remain inaccessible. */
export function isModuleAvailable(lang: Language, path: string): boolean {
  const root = "/" + path.split("/").filter(Boolean)[0];
  switch (root) {
    case "/learn":
      return path === "/learn/custom" || lang.vocab.length > 0;
    case "/lesson":
      return path === "/lesson/custom" || lang.vocab.length > 0;
    case "/quiz":
      return lang.vocab.length > 0;
    case "/dialoge":
      return Boolean(lang.scenarios?.length);
    case "/listen":
      return lang.listening.length > 0;
    case "/read":
      return lang.texts.length > 0;
    case "/podcasts":
      return lang.episodes.length > 0;
    case "/speak":
      return lang.vocab.length > 0;
    case "/tones":
      return Boolean(lang.tonePractice && lang.toneModule === "mandarin");
    default:
      return true;
  }
}
export const navigationFor = (lang: Language) => NAVIGATION.filter((item) => isModuleAvailable(lang, item.to));
const pick = (paths: string[]) => paths.map((path) => NAVIGATION.find((item) => item.to === path)!);
export const modules = pick(["/learn", "/review", "/dialoge", "/speak", "/quiz"]);
export const LEARN = pick(["/learn", "/review", "/notebook"]);
export const ARCHIVE = pick(["/chronicle", "/settings"]);
export const practiceItems = (lang: Language) =>
  pick(["/quiz", "/dialoge", "/listen", "/speak", "/tones", "/read", "/podcasts"]).filter((item) =>
    isModuleAvailable(lang, item.to),
  );

export function sectionFor(path: string) {
  if (path === "/lesson/custom" || path === "/learn/custom") return "/notebook";
  if (path.startsWith("/dialoge/")) return "/dialoge";
  if (path.startsWith("/lesson/") || path.startsWith("/learn/")) return "/learn";
  return path;
}

/** The same five destinations on desktop and mobile; practice modes remain addressable. */
export const primaryNavigation = [
  item("/heute", "Heute", House),
  item("/learn", "Wortschatz", BookOpen),
  item("/practice", "Üben", MessageCircle),
  item("/chronicle", "Fortschritt", ChartNoAxesColumnIncreasing),
  item("/settings", "Profil", UserRound),
];
export function workspaceSection(path: string): string {
  const root = "/" + path.split("/").filter(Boolean)[0];
  if (["/learn", "/lesson", "/review", "/notebook"].includes(root)) return "/learn";
  if (["/heute", "/lernplan", "/lernkalender"].includes(root)) return "/heute";
  if (["/settings", "/chronicle"].includes(root)) return root;
  return "/practice";
}

export const quickLinks = primaryNavigation;
