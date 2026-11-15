import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Languages, X } from "lucide-react";
import { languages, upcomingLanguages } from "../data/languages";
import { useStore } from "../lib/store";
import "./course-switcher.css";

const themes: Record<string, { image: string; accent: string }> = {
  zh: { image: "mandarin/palace.webp", accent: "#852e25" },
  ja: { image: "landing/ja.webp", accent: "#784058" },
  ko: { image: "landing/ko.webp", accent: "#345b62" },
  vi: { image: "landing/vi.webp", accent: "#336653" },
};

export default function CourseSwitcher({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <>
    <button type="button" ref={trigger} className={"course-trigger " + className} aria-haspopup="dialog"
      onClick={() => setOpen(true)}><Languages size={19} aria-hidden/>Sprache wechseln</button>
    {open && createPortal(<SwitchDialog onClose={() => {
      setOpen(false);
      trigger.current?.focus();
    }}/>, document.body)}
  </>;
}

function SwitchDialog({ onClose }: { onClose: () => void }) {
  const { lang, username, updateSettings, sync } = useStore();
  const [selected, select] = useState(lang.code);
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useId();
  const navigate = useNavigate();
  const theme = themes[lang.code] ?? { image: "landing/welt.webp", accent: "#615046" };
  const courses = languages.filter(l => l.available);
  const planned = upcomingLanguages.filter(l => !courses.some(c => c.code === l.code));
  const canSwitch = selected !== lang.code && courses.some(c => c.code === selected) && !(username && sync.pending);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  function close() { dialog.current?.close(); }
  function confirm() {
    if (!canSwitch) return;
    close();
    updateSettings({ lang: selected });
    if (!username) navigate("/heute");
  }
  return <dialog ref={dialog} aria-labelledby={title} className="course-dialog"
    style={{borderColor: theme.accent}} onClose={onClose} onClick={e => {
      if (e.target === e.currentTarget) {
        const r = e.currentTarget.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();
      }
    }}>
    <header style={{backgroundImage: `linear-gradient(0deg,#241b18dc,transparent),url("${import.meta.env.BASE_URL}${theme.image}")`}}>
      <button type="button" aria-label="Schließen" onClick={close}><X size={20}/></button>
      <small>Aktuelle Sprache</small><strong>{lang.name} · <span lang={lang.code}>{lang.nativeName}</span></strong>
    </header>
    <div className="course-dialog-body">
      <h2 id={title}>Sprache wechseln</h2>
      <fieldset>
        <legend>Verfügbare Kurse</legend>
        {courses.map(l => <label key={l.code}><input type="radio" name={title} checked={l.code === selected}
          onChange={() => select(l.code)} style={{accentColor:theme.accent}}/>{l.name}{l.code === lang.code && <small>Aktiv</small>}</label>)}
      </fieldset>
      {planned.length > 0 && <p>In Vorbereitung: {planned.map(l => l.name).join(", ")}.</p>}
      {sync.pending && username && <p role="status">{sync.status}</p>}
      <footer>
        <button type="button" onClick={close}>Schließen</button>
          {courses.length > 1 && <button type="button" disabled={!canSwitch} style={{background:theme.accent,color:"white"}} onClick={confirm}>Sprache wechseln</button>}
      </footer>
    </div>
  </dialog>;
}
