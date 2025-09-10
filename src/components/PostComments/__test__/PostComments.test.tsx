import { render, screen, fireEvent } from "@testing-library/react";
import Post from "../../Post";

jest.mock("../../../models/Comment", () => {
  return class Comment {
    id: number;
    comment: string;

    constructor(id: number, comment: string) {
      this.id = id;
      this.comment = comment;
    }
  };
});

describe("Testes para o componente de comentários", () => {
  test("Deve ser capaz de adicionar dois comentários via submissão do formulário", () => {
    render(<Post />);

    // Encontrar os elementos na tela
    const textarea = screen.getByTestId("comment-textarea");
    const form = screen.getByTestId("comment-form");

    // Adicionar o primeiro comentário
    fireEvent.change(textarea, {
      target: { value: "Este é o primeiro comentário" },
    });
    // Aciona o envento SUBMIT
    fireEvent.submit(form);

    // Verifica se o primeiro comentário apareceu
    expect(
      screen.getByText("Este é o primeiro comentário")
    ).toBeInTheDocument();

    // Adicionar o segundo comentário
    fireEvent.change(textarea, {
      target: { value: "Adicionando um segundo comentário" },
    });
    fireEvent.submit(form);

    // Verifica se o segundo comentário apareceu
    expect(
      screen.getByText("Adicionando um segundo comentário")
    ).toBeInTheDocument();

    // Verifica se o campo de texto foi limpo após a submissão
    expect(textarea).toHaveValue("");
  });
});
