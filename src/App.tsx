import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import GaragePage from "./components/Garage/GaragePage";
import WinnersPage from "./components/Winners/WinnersPage.tsx";

function App() {
  return (
    <BrowserRouter basename="/async-race">
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<GaragePage />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
