import CoursePicker from "./features/account/CoursePicker";
import Teahouse from "./features/welcome/Teahouse";
import { AccountEntry } from "./features/welcome/Welcome";
import { useStore } from "./lib/store";
import { Navigate, Route, Routes } from "react-router-dom";
import MandarinHome from "./features/progress/MandarinHome";
import MandarinLayout from "./components/MandarinLayout";
import Layout from "./components/Layout";
import Category from "./features/study/Category";
import Chronicle from "./features/progress/Chronicle";
import Dashboard from "./features/progress/Dashboard";
import { More, Practice } from "./features/practice/Hub";
import Learn from "./features/study/Learn";
import Lesson from "./features/study/Lesson";
import Listen from "./features/practice/Listen";
import Notebook from "./features/study/Notebook";
import Podcasts from "./features/practice/Podcasts";
import Quiz from "./features/study/Quiz";
import Read from "./features/practice/Read";
import Review from "./features/study/Review";
import Settings from "./features/account/Settings";
import Speak from "./features/practice/Speak";
import Tones from "./features/practice/Tones";

export default function App() {
  const { lang } = useStore();
  return (
    <Routes>
      <Route path="anmelden" element={<AccountEntry />} />
      <Route path="sprachwahl" element={<CoursePicker />} />
      <Route path="sprachen/:course" element={<AccountEntry />} />
      <Route element={lang.code === "zh" ? <MandarinLayout /> : <Layout />}>
        <Route path="sprachen/zh/teehaus" element={<Teahouse />} />
        <Route path="heute" element={lang.code === "zh" ? <MandarinHome /> : <Navigate to="/lernplan" replace />} />
        <Route path="lernplan" element={<Dashboard />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/custom" element={<Notebook key="category" startAdding />} />
        <Route path="learn/:categoryId" element={<Category />} />
        <Route path="lesson/:categoryId" element={<Lesson />} />
        <Route path="review" element={<Review />} />
        <Route path="notebook" element={<Notebook />} />
        <Route path="practice" element={lang.code === "zh" ? <Navigate to="/heute" replace /> : <Practice />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="listen" element={<Listen />} />
        <Route path="speak" element={<Speak />} />
        <Route path="tones" element={lang.tonePractice ? <Tones /> : <Navigate to="/practice" replace />} />
        <Route path="read" element={<Read />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="chronicle" element={<Chronicle />} />
        <Route path="more" element={<More />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
