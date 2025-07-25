import { Route, Routes } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Footer from "./footer/Footer";
import Header from "./header & nav/Header";
import HomeNoAuth from "./home/HomeNoAuth";
import Login from "./authentication/Login";
import PublicGuard from "./authentication/guards/PublicGuard";
import PrivateGuard from "./authentication/guards/PrivateGuard";
import Register from "./authentication/Register";
import Logout from "./authentication/Logout";
import HomeAuth from "./home/HomeAuth";
import BudgetMiddleware from "./budget/BudgetMiddleware";
import NotFound from "./not found/NotFound";
import About from "./about/About";

export default function Layout() {
  const { isAuthenticated } = useAuthContext();
  return (
    <div className="max-w-full flex flex-col mx-auto size-full">
      {!isAuthenticated && <Header />}

      <main id="content">
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<HomeAuth />} />
          ) : (
            <Route path="/" element={<HomeNoAuth />} />
          )}

          <Route path="/about" element={<About />} />

          <Route element={<PublicGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateGuard />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/:budgetId" element={<BudgetMiddleware />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
