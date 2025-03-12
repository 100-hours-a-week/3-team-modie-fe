// src/components/User.test.tsx
import { screen, waitFor } from "@testing-library/react";
import { renderWithQueryClient } from "./render-with-query-client";
import User from "./user";

describe("User component", () => {
  it("renders loading state initially", () => {
    renderWithQueryClient(<User />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders user name after data fetched", async () => {
    renderWithQueryClient(<User />);
    await waitFor(() =>
      expect(screen.getByText(/User name: hazel/i)).toBeInTheDocument()
    );
  });
});
