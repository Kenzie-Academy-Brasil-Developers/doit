import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import api from "../../services/api";
import SignUp from "../../pages/SignUp";
import { act } from "react-dom/test-utils";

const apiMock = new MockAdapter(api);

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  Link: ({ children }) => children,
}));

describe("SignUp Page", () => {
  beforeEach(() => {
    mockHistoryPush.mockClear();
  });

  it("should be able to sign up", async () => {
    apiMock.onPost("register").replyOnce(200, {});

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText("Seu nome");
    const emailField = getByPlaceholderText("Seu melhor email");
    const passwordField = getByPlaceholderText("Uma senha bem segura");
    const confirmPasswordField = getByPlaceholderText("Confirmação de senha");
    const buttonElement = getByText("Enviar");

    await act(async () => {
      fireEvent.change(nameField, { target: { value: "John Doe" } });
      fireEvent.change(emailField, {
        target: { value: "johndoe@example.com" },
      });
      fireEvent.change(passwordField, { target: { value: "123456789@Aa" } });
      fireEvent.change(confirmPasswordField, {
        target: { value: "123456789@Aa" },
      });
      fireEvent.click(buttonElement);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/login");
  });

  it("should not be able to sign up with invalid credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText("Seu nome");
    const emailField = getByPlaceholderText("Seu melhor email");
    const passwordField = getByPlaceholderText("Uma senha bem segura");
    const confirmPasswordField = getByPlaceholderText("Confirmação de senha");
    const buttonElement = getByText("Enviar");

    fireEvent.change(nameField, { target: { value: "John Doe" } });
    fireEvent.change(emailField, { target: { value: "invalid-email" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });
    fireEvent.change(confirmPasswordField, {
      target: { value: "123456789@Aa" },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockHistoryPush).not.toHaveBeenCalled();
    });
  });
});
