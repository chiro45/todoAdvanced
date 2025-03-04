import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BacklogScreen } from "../components/screens/BacklogScreen/BacklogScreen";
import { SprintScreen } from "../components/screens/SprintScreen/SprintScreen";
import { Header } from "../components/ui/Header/Header";
import { Sidebar } from "../components/ui/Sidebar/Sidebar";

export const AppRoute = () => {
  return (
    <Router>
      <Header />
      <div style={{ display: "grid", gridTemplateColumns: "20vw 80vw" }}>
        <Sidebar />
        <Routes>
          {/* La ruta base puede recibir un idTarea opcional */}
          <Route path="/" element={<BacklogScreen />} />

          {/* La ruta del sprint con idSprint obligatorio e idTarea opcional */}
          <Route
            path="/sprint/:idSprint"
            element={<SprintScreen />}
          />
        </Routes>
      </div>
    </Router>
  );
};
