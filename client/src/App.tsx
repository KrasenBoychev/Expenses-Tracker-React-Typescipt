import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/AuthContext";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HomeNoAuth from "./components/home/HomeNoAuth";
import Login from "./components/authentication/Login";
import PublicGuard from "./components/authentication/guards/PublicGuard";
import PrivateGuard from "./components/authentication/guards/PrivateGuard";
import Register from "./components/authentication/Register";
import "./App.css";
import Logout from "./components/authentication/Logout";

function App() {
  return (
    <AuthContextProvider>
      <Toaster />

      <div className="max-w-3xl flex flex-col mx-auto size-full">
        <Header />
        <main id="content">
          <Routes>
            <Route element={<PublicGuard />}>
              <Route path="/" element={<HomeNoAuth />} />
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
    </AuthContextProvider>
  );
}

export default App;
