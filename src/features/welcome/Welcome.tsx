import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { languages } from "../../data/languages";
import { useStore } from "../../lib/store";
import AccountPanel from "../account/AccountPanel";
import "./landing.css";
import "./welcome.css";
export { default as Welcome } from "./Landing";

export function AccountEntry() {
  const { course } = useParams();
  const { username, updateSettings, lang } = useStore();
  if (course && !languages.some(l => l.code === course && l.available)) return <Navigate to="/sprachwahl" replace/>;
  const next = course ? "/heute" : "/sprachwahl";
  if (username) return <Navigate to={course === lang.code ? "/heute" : "/sprachwahl"} replace/>;
  return <div className="lf-landing lf-account">
    <header className="lf-top"><div className="lf-inner lf-bar">
      <Link className="lf-logo" to="/"><BookOpen aria-hidden/>LinguaFlow</Link>
      <Link className="account-back" to="/"><ArrowLeft size={16}/> Zur Sprachwahl</Link>
    </div></header>
    <main className="account-entry">
      <div className="account-art">
        <div><h1>Sprachen lernen,<br/><em>Kulturen erleben.</em></h1>
          {course === "zh" && <Link to="/sprachen/zh/teehaus">Probelektion im Teehaus <ArrowRight size={16}/></Link>}
        </div>
        <small>Illustration: KI-generiert</small>
      </div>
      <section className="account-paper" aria-label="Lernkonto">
        <AccountPanel afterAuth={course ? "?lang=" + encodeURIComponent(course) + "#/heute" : "#/sprachwahl"}/>
        <Link className="account-guest" to={next} onClick={() => { if (course && lang.code !== course) updateSettings({lang: course}); }}>Als Gast weiterlernen <ArrowRight size={16}/></Link>
      </section>
    </main>
  </div>;
}
