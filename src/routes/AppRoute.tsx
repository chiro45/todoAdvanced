import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BacklogScreen } from "../components/screens/BacklogScreen/BacklogScreen";
import { SprintsScreen } from "../components/screens/SprintsScreen/SprintsScreen";
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen";
import { Header } from "../components/ui/Header/Header";
import { Sidebar } from "../components/ui/Sidebar/Sidebar";
export const AppRoute = () => {
  return (
    <Router>
      <Header />
      <div style={{ display: "grid", gridTemplateColumns: "15vw 85vw" }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<BacklogScreen />} />
          <Route path="/sprints" element={<SprintsScreen />} />
          <Route
            path="/sprint/:idSprint/:idTarea?"
            element={<SprintScreen />}
          />
        </Routes>
      </div>
    </Router>
  );
};
