import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <Toaster />
      <Layout />
    </AuthContextProvider>
  );
}

export default App;
