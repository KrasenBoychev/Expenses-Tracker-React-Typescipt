import ReactDOMClient from "react-dom/client";
import { it } from "vitest";
import App from "../App";

it("renders App without crashing", () => {
  const div = document.createElement("div");
  ReactDOMClient.createRoot(div).render(<App />);
});