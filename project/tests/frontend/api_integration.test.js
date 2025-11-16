import { render, screen, waitFor } from "@testing-library/react";
import App from "../../src/App";
import { server } from "../../src/mocks/server"; // Assuming MSW is used for mocking
import { rest } from "msw";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("API Integration Tests", () => {
  test("renders data from API on load", async () => {
    render(<App />);

    // Example: Check if data fetched from API is displayed
    const item = await waitFor(() => screen.getByText(/example item/i));
    expect(item).toBeInTheDocument();
  });

  test("handles API error gracefully", async () => {
    server.use(
      rest.get("/api/items", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<App />);

    // Example: Check if error message is displayed
    const errorMessage = await waitFor(() => screen.getByText(/failed to load data/i));
    expect(errorMessage).toBeInTheDocument();
  });
});