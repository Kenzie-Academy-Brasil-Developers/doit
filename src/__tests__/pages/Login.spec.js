import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import Login from "../../pages/Login";
import api from "../../services/api";

const apiMock = new MockAdapter(api);

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  Link: ({ children }) => children,
}));

describe("Login Page", () => {
  it("should be able to sign in", async () => {
    apiMock.onPost("/login").replyOnce(200, {});

    const { getByPlaceholderText, getByText } = render(
      <Login setAuthenticated={jest.fn()} authenticated={false} />
    );

    const emailField = getByPlaceholderText("Seu melhor email");
    const passwordField = getByPlaceholderText("Uma senha bem segura");
    const buttonElement = getByText("Enviar");

    fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordField, { target: { value: "12345678" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(emailField).toHaveValue("johndoe@example.com");
      expect(passwordField).toHaveValue("12345678");
      expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should not be able to sign in with invalid credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText("Seu melhor email");
    const passwordField = getByPlaceholderText("Uma senha bem segura");
    const buttonElement = getByText("Enviar");

    fireEvent.change(emailField, { target: { value: "not-valid-email" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(getByText(/Email inválido/)).toBeInTheDocument();
      expect(getByText(/Mínimo de 8 dígitos/)).toBeInTheDocument();
      expect(mockHistoryPush).not.toHaveBeenCalled();
    });
  });
});
