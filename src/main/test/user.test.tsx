import { screen, waitFor } from "@testing-library/react";
import { renderWithQueryClient } from "../../__test__/renderWithQueryClient";
import TestUserComponent from "../components/TestUserComponent";

describe("User component", () => {
  it("renders loading state initially", () => {
    renderWithQueryClient(<TestUserComponent />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders user name after data fetched", async () => {
    renderWithQueryClient(<TestUserComponent />);
    await waitFor(() =>
      expect(screen.getByText(/User name: hazel/i)).toBeInTheDocument()
    );
  });
});
