import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import Input from "../../components/Input";

describe("Input component", () => {
  it("should be able to render an input", () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" error="" register={jest.fn()} />
    );

    expect(getByPlaceholderText("E-mail")).toBeTruthy();
  });

  it("should be able to render an error", async () => {
    const { getByText } = render(
      <Input
        name="email"
        placeholder="E-mail"
        error="Campo obrigatório"
        register={jest.fn()}
      />
    );

    const error = getByText(/Campo obrigatório/);

    expect(error).toBeInTheDocument();
  });
});
