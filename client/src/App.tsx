import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HomeNoAuth from "./components/home/HomeNoAuth";
import Login from "./components/authentication/Login";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthContextProvider>
      <Toaster />
      <div className="max-w-3xl flex flex-col mx-auto size-full">
        <Header />

        <main id="content">
          <Routes>
            <Route path="/" element={<HomeNoAuth />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
