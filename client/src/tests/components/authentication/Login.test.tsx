import { it, expect, vi } from "vitest";
import {
  fireEvent,
  getByDisplayValue,
  getByRole,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../../../components/authentication/Login";

const LoginComponent = (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);

it("renders 'Login' without crashing", () => {
  render(LoginComponent);
});

it("renders 'Don't have an account yet?'", () => {
  render(LoginComponent);
  expect(screen.getByText("Don't have an account yet?")).toBeVisible();
});

it("renders 'Sign up here' link", () => {
  render(LoginComponent);
  expect(screen.getByText("Sign up here")).toBeVisible();
});

it("renders 'Email address' label and input", () => {
  render(LoginComponent);
  expect(screen.getByText("Email address")).toBeVisible();
  expect(screen.getByTestId("login-email-input")).toBeVisible();
});

it("renders 'Password' label and input", () => {
  render(LoginComponent);
  expect(screen.getByText("Password")).toBeVisible();
  expect(screen.getByTestId("login-password-input")).toBeVisible();
});

it("does not render error paragraphs", () => {
  expect(screen.queryByTestId("login-email-error")).not.toBeInTheDocument();
  expect(screen.queryByTestId("login-password-error")).not.toBeInTheDocument();
});

it("renders 'Sign in' button", () => {
  render(LoginComponent);
  expect(screen.getByTestId("login-form-button")).toBeVisible();
});

it("renders error message when email is not valid", () => {
  render(LoginComponent);
  const emailInput = screen.getByTestId("login-email-input");
  const passwordInput = screen.getByTestId("login-password-input");
  const submitBtn = screen.getByTestId("login-form-button");

  fireEvent.change(emailInput, { target: { value: "krasen@k" } });
  fireEvent.change(passwordInput, { target: { value: "123" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("login-email-error")).toBeVisible();

  fireEvent.change(emailInput, { target: { value: "krasen@k.c" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("login-email-error")).toBeVisible();
});

it("renders error message when password is less than 3 symbols", () => {
  render(LoginComponent);
  const emailInput = screen.getByTestId("login-email-input");
  const passwordInput = screen.getByTestId("login-password-input");
  const submitBtn = screen.getByTestId("login-form-button");

  fireEvent.change(emailInput, { target: { value: "krasen@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "1" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("login-password-error")).toBeVisible();

  fireEvent.change(passwordInput, { target: { value: "12" } });
  fireEvent.click(submitBtn);
  expect(screen.getByTestId("login-password-error")).toBeVisible();
});