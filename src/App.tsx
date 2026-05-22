import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import GaragePage from "./components/Garage/GaragePage";

function App() {
  return (
    <BrowserRouter basename="/async-race">
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<GaragePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
