import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Category from "./pages/Category";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Lesson from "./pages/Lesson";
import Listen from "./pages/Listen";
import Podcasts from "./pages/Podcasts";
import Quiz from "./pages/Quiz";
import Review from "./pages/Review";
import Settings from "./pages/Settings";
import Speak from "./pages/Speak";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/:categoryId" element={<Category />} />
        <Route path="lesson/:categoryId" element={<Lesson />} />
        <Route path="review" element={<Review />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="listen" element={<Listen />} />
        <Route path="speak" element={<Speak />} />
        <Route path="podcasts" element={<Podcasts />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
