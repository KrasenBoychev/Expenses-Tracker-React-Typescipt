import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HomeNoAuth from "./components/home/HomeNoAuth";

function App() {
  return (
    <div className="max-w-3xl flex flex-col mx-auto size-full">
      <Header />

      <main id="content">
        <Routes>
          <Route path="/" element={<HomeNoAuth />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
