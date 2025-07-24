import ReactDOMClient from "react-dom/client";
import { it } from "vitest";
import Footer from "../components/footer/Footer";

it("renders Footer without crashing", () => {
  const div = document.createElement("div");
  ReactDOMClient.createRoot(div).render(<Footer />);
});
