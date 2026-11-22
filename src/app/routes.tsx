import PasswordRecovery from "../features/account/PasswordRecovery";
import CoursePicker from "../features/account/CoursePicker";
import Dialogs, { DialogScene } from "../features/dialogues/Dialogs";
import { AccountEntry } from "../features/welcome/Welcome";
import { useStore } from "../state/learningStore";
import { Navigate, Route, Routes } from "react-router-dom";
import { languageViews, toneViews } from "./languageViews";
import LearningLayout from "./layouts/LearningLayout";
import { isModuleAvailable } from "./navigation";
import type { ReactNode } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Category from "../features/vocabulary/Category";
import Chronicle from "../features/progress/Chronicle";
import Dashboard from "../features/progress/Dashboard";
import { More } from "../features/practice/Hub";
import Learn from "../features/vocabulary/Learn";
import Lesson from "../features/lessons/Lesson";
import Listen from "../features/listening/Listen";
import Notebook from "../features/notebook/Notebook";
import Podcasts from "../features/listening/Podcasts";
import Quiz from "../features/quizzes/Quiz";
import Read from "../features/reading/Read";
import Review from "../features/review/Review";
import Settings from "../features/account/Settings";
import Speak from "../features/speaking/Speak";

function ModuleGuard({ children }: { children?: ReactNode }) {
  const { lang } = useStore();
  const { pathname } = useLocation();
  return isModuleAvailable(lang, pathname) ? <>{children ?? <Outlet />}</> : <Navigate to="/heute" replace />;
}

export default function AppRoutes() {
  const { lang } = useStore();
  const Home = languageViews[lang.code]?.Home ?? Dashboard;
  const Tones = lang.toneModule ? toneViews[lang.toneModule] : undefined;
  return (
    <Routes>
      <Route path="passwort-vergessen" element={<PasswordRecovery />} />
      <Route path="passwort-zuruecksetzen" element={<PasswordRecovery />} />
      <Route path="anmelden" element={<AccountEntry />} />
      <Route path="sprachwahl" element={<CoursePicker />} />
      <Route path="sprachen/:course" element={<AccountEntry />} />
      <Route element={<LearningLayout />}>
        <Route element={<ModuleGuard />}>
          <Route path="sprachen/zh/teehaus" element={<Navigate to="/dialoge/bestellen" replace />} />
          <Route path="dialoge" element={<Dialogs />} />
          <Route path="dialoge/:sceneId" element={<DialogScene />} />
          <Route path="heute" element={<Home />} />
          <Route path="lernplan" element={<Dashboard />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/custom" element={<Notebook key="category" />} />
          <Route path="learn/:categoryId" element={<Category />} />
          <Route path="lesson/:categoryId" element={<Lesson />} />
          <Route path="review" element={<Review />} />
          <Route path="notebook" element={<Notebook />} />
          <Route path="practice" element={<Navigate to="/heute" replace />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="listen" element={<Listen />} />
          <Route path="speak" element={<Speak />} />
          <Route path="tones" element={lang.tonePractice && Tones ? <Tones /> : <Navigate to="/practice" replace />} />
          <Route path="read" element={<Read />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="chronicle" element={<Chronicle />} />
          <Route path="more" element={<More />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
