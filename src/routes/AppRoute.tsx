import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BacklogScreen } from "../components/screens/BacklogScreen/BacklogScreen";
import { SprintsScreen } from "../components/screens/SprintsScreen/SprintsScreen";
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen";
export const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BacklogScreen />} />
        <Route path="/sprints" element={<SprintsScreen />} />
        <Route path="/sprint/:idSprint/:idTarea?" element={<SprintScreen />} />
      </Routes>
    </Router>
  );
};
