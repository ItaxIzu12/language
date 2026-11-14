import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Category from "./pages/Category";
import Chronicle from "./pages/Chronicle";
import Dashboard from "./pages/Dashboard";
import { More, Practice } from "./pages/Hub";
import Learn from "./pages/Learn";
import Lesson from "./pages/Lesson";
import Listen from "./pages/Listen";
import Notebook from "./pages/Notebook";
import Podcasts from "./pages/Podcasts";
import Quiz from "./pages/Quiz";
import Read from "./pages/Read";
import Review from "./pages/Review";
import Settings from "./pages/Settings";
import Speak from "./pages/Speak";
import Tones from "./pages/Tones";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/:categoryId" element={<Category />} />
        <Route path="lesson/:categoryId" element={<Lesson />} />
        <Route path="review" element={<Review />} />
        <Route path="notebook" element={<Notebook />} />
        <Route path="practice" element={<Practice />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="listen" element={<Listen />} />
        <Route path="speak" element={<Speak />} />
        <Route path="tones" element={<Tones />} />
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
