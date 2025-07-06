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

export default function Layout() {
  const { isAuthenticated } = useAuthContext();
  return (
    <div className="max-w-3xl flex flex-col mx-auto size-full">
      {!isAuthenticated && <Header />}

      <main id="content">
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<HomeAuth />} />
          ) : (
            <Route path="/" element={<HomeNoAuth />} />
          )}

          <Route element={<PublicGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateGuard />}>
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
