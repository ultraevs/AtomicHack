import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "../pages/Main";
import { History } from "../pages/History";
import { Auth } from "../pages/Auth";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/history" element={<History />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
