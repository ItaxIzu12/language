import { ArrowDown, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { languages } from "../../data/languages";
import { useStore } from "../../lib/store";
import AccountPanel from "../account/AccountPanel";
import { accountEnabled } from "../account/account";
import "./welcome.css";

function Masthead() {
  return <header className="welcome-nav"><Link to="/" className="welcome-brand"><BookOpen aria-hidden size={24}/> LinguaFlow</Link></header>;
}

export function Welcome() {
  return <div className="welcome"><div className="welcome-wrap">
    <Masthead />
    <main>
      <section className="welcome-intro">
        <div><h1>Wörter lernen.<br/><em>Ins Gespräch kommen.</em></h1>
          <p>Baue deinen Wortschatz auf, höre kurze Dialoge und übe, selbst zu antworten. Dein Tagesblatt zeigt dir, welche Wörter heute zur Wiederholung anstehen.</p>
          <button className="welcome-action" onClick={() => document.getElementById("kurse")?.focus()}>Sprachen entdecken <ArrowDown size={18}/></button>
        </div>
        <figure className="welcome-sheet" aria-label="Mandarin-Beispiel: 你好, nǐ hǎo, Hallo">
          <div aria-hidden="true"><span>Mandarin</span><strong lang="zh">你好</strong><i>nǐ hǎo</i><small>Hallo</small></div>
        </figure>
      </section>
      <section className="welcome-languages" aria-labelledby="kurse">
        <h2 id="kurse" tabIndex={-1}>Welche Sprache möchtest du lernen?</h2>
        {languages.filter(l => l.available).map(l => <Link key={l.code} className="welcome-course" to={`/sprachen/${l.code}`}>
          <span className="welcome-mark" lang={l.code}>{l.nativeName}</span>
          <span><strong>{l.name}</strong><small>{l.readingName} · Wortschatz · Hör- und Sprechübungen</small></span>
          <ArrowRight aria-hidden/>
        </Link>)}
      </section>
    </main>
  </div></div>;
}

export function MandarinEntry() {
  const { username } = useStore();
  return <div className="welcome"><div className="welcome-wrap"><Masthead/>
    <main className="welcome-entry">
      <div><Link className="underline" to="/">← Zur Sprachwahl</Link>
        <h1>Chinesisch<br/><em>lernen.</em></h1>
        <p>Entdecke Mandarin mit Schriftzeichen, Pinyin und gesprochenen Dialogen. In deinem Lernkonto sammelst du eigene Wörter und setzt deine Lektionen auf mehreren Geräten fort.</p>
      </div>
      <section className="welcome-form">
        <h2>{username ? "Dein Mandarin-Kurs" : "Dein Lernkonto"}</h2>
        {username ? <Link className="welcome-action" to="/heute">Zum Tagesblatt <ArrowRight size={18}/></Link> : <>
          {accountEnabled ? <AccountPanel entry/> : <p>In der statischen Version kannst du als Gast lernen. Lernkonten stehen in der Docker-Version bereit.</p>}
          <Link className="welcome-guest" to="/heute">Als Gast Chinesisch lernen <ArrowRight size={16}/></Link>
        </>}
      </section>
    </main></div></div>;
}
