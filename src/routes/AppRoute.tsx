import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BacklogScreen } from "../components/screens/BacklogScreen/BacklogScreen";
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen";
export const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BacklogScreen />} />
        <Route path="/sprints" element={<SprintScreen />} />
      </Routes>
    </Router>
  );
};
