import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders title", () => {

  render(<MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>);
  const title = screen.getByText(/Spotification/i);
  expect(title).toBeInTheDocument();
});
