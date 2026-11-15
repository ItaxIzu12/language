import { BookOpen, Layers, MessageCircle, Mic, Target, House, NotebookPen, ChartNoAxesColumnIncreasing, LibraryBig, UserRound } from "lucide-react";

import { PRACTICE } from "./nav";

export const modules = [
  { title: "Vokabeln", hint: "Wortschatz erweitern", art: "book", to: "/learn", icon: BookOpen },
  { title: "Wiederholen", hint: "Wissen festigen", art: "scroll", to: "/review", icon: Layers },
  { title: "Dialoge", hint: "Im Teehaus bestellen", art: "tea", to: "/sprachen/zh/teehaus", icon: MessageCircle },
  { title: "Sprechtraining", hint: "Aussprache üben", art: "microphone", to: "/speak", icon: Mic },
  { title: "Quiz", hint: "Dein Wissen testen", art: "lantern", to: "/quiz", icon: Target },
];
export const links = [
  { title: "Startseite", to: "/heute", icon: House }, ...modules,
  { title: "Fundstücke", to: "/notebook", icon: NotebookPen },
  { title: "Lernfortschritt", to: "/chronicle", icon: ChartNoAxesColumnIncreasing },
  ...PRACTICE.filter(item => ["/listen", "/tones", "/podcasts"].includes(item.to)).map(item => ({ title: item.label, to: item.to, icon: item.icon })),
  { title: "Lesetexte", to: "/read", icon: LibraryBig },
];


export const quickLinks = [
  { title: "Start", to: "/heute", icon: House },
  { title: "Vokabeln", to: "/learn", icon: BookOpen },
  { title: "Dialoge", to: "/sprachen/zh/teehaus", icon: MessageCircle },
  { title: "Fortschritt", to: "/chronicle", icon: ChartNoAxesColumnIncreasing },
  { title: "Profil", to: "/settings", icon: UserRound },
];
