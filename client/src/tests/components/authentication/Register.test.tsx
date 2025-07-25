import { it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../../../components/authentication/Register";

const RegisterComponent = (
  <BrowserRouter>
    <Register />
  </BrowserRouter>
);

it("renders 'Register' without crashing", () => {
  render(RegisterComponent);
});


