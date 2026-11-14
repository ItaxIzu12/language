import { Welcome, MandarinEntry } from "./features/welcome/Welcome";
import { useStore } from "./lib/store";
import { Navigate, Route, Routes } from "react-router-dom";
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
      <Route index element={<Welcome />} />
      <Route path="sprachen/zh" element={<MandarinEntry />} />
      <Route element={<Layout />}>
        <Route path="heute" element={<Dashboard />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/:categoryId" element={<Category />} />
        <Route path="lesson/:categoryId" element={<Lesson />} />
        <Route path="review" element={<Review />} />
        <Route path="notebook" element={<Notebook />} />
        <Route path="practice" element={<Practice />} />
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
