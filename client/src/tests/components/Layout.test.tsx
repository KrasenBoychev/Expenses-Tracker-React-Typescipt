import { it } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "../../components/Layout";

it("renders 'Layout' without crashing", () => {
  render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
});
