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

it("renders 'Have an account yet?'", () => {
  render(RegisterComponent);
  expect(screen.getByText("Have an account yet?")).toBeVisible();
});

it("renders 'Sign in here", () => {
  render(RegisterComponent);
  expect(screen.getByText("Sign in here")).toBeVisible();
});

it("renders 'Email address' label and input", () => {
  render(RegisterComponent);
  expect(screen.getByText("Email address")).toBeVisible();
  expect(screen.getByTestId("register-email-input")).toBeVisible();
});

it("renders 'Password' label and input", () => {
  render(RegisterComponent);
  expect(screen.getByText("Password")).toBeVisible();
  expect(screen.getByTestId("register-password-input")).toBeVisible();
});

it("renders 'Confirm Password' label and input", () => {
  render(RegisterComponent);
  expect(screen.getByText("Confirm Password")).toBeVisible();
  expect(screen.getByTestId("register-rePass-input")).toBeVisible();
});

it("does not render error paragraphs", () => {
  render(RegisterComponent);
  expect(screen.queryByTestId("register-email-error")).not.toBeInTheDocument();
  expect(
    screen.queryByTestId("register-password-error")
  ).not.toBeInTheDocument();
  expect(screen.queryByTestId("register-rePass-error")).not.toBeInTheDocument();
});

it("renders 'Sign up' button", () => {
  render(RegisterComponent);
  expect(screen.getByTestId("register-form-button")).toBeVisible();
});

it("renders error message when email is not valid", () => {
  render(RegisterComponent);
  const emailInput = screen.getByTestId("register-email-input");
  const passwordInput = screen.getByTestId("register-password-input");
  const rePassInput = screen.getByTestId("register-rePass-input");
  const submitBtn = screen.getByTestId("register-form-button");

  fireEvent.change(emailInput, { target: { value: "krasen@k" } });
  fireEvent.change(passwordInput, { target: { value: "123" } });
  fireEvent.change(rePassInput, { target: { value: "123" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("register-email-error")).toBeVisible();

  fireEvent.change(emailInput, { target: { value: "krasen@k.c" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("register-email-error")).toBeVisible();
});

it("renders error message when password is less than 3 symbols", () => {
  render(RegisterComponent);
  const emailInput = screen.getByTestId("register-email-input");
  const passwordInput = screen.getByTestId("register-password-input");
  const rePassInput = screen.getByTestId("register-rePass-input");
  const submitBtn = screen.getByTestId("register-form-button");

  fireEvent.change(emailInput, { target: { value: "krasen@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "1" } });
  fireEvent.change(rePassInput, { target: { value: "1" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("register-password-error")).toBeVisible();

  fireEvent.change(passwordInput, { target: { value: "12" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("register-password-error")).toBeVisible();
});

it("renders error message when passwords don't match", () => {
  render(RegisterComponent);
  const emailInput = screen.getByTestId("register-email-input");
  const passwordInput = screen.getByTestId("register-password-input");
  const rePassInput = screen.getByTestId("register-rePass-input");
  const submitBtn = screen.getByTestId("register-form-button");

  fireEvent.change(emailInput, { target: { value: "krasen@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "123" } });
  fireEvent.change(rePassInput, { target: { value: "1234" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("register-rePass-error")).toBeVisible();

  fireEvent.change(passwordInput, { target: { value: "12345" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("register-rePass-error")).toBeVisible();
});