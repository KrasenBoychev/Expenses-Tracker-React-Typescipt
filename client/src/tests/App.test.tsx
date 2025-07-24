import { it } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

it("renders 'App' without crashing", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
