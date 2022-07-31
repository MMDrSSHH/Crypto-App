import { Routes, Route, Navigate } from "react-router-dom";

// pages
import CoinsPage from "./pages/CoinsPage";
import CoinPage from "./pages/CoinPage";

const App = () => {
  return (
    <Routes>
      <Route path="/coins" element={<CoinsPage />} />
      <Route path="/coins/:coinId" element={<CoinPage />} />
      <Route path="/" element={<Navigate to="/coins" />} />
    </Routes>
  );
};

export default App;
