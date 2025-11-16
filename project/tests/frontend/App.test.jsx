import { render, screen } from "@testing-library/react";
import App from "../../src/App";

test("renders the app component", () => {
  render(<App />);

  // Example test: Check if the app renders a specific text
  const linkElement = screen.getByText(/welcome to studybuddy/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders navigation bar", () => {
  render(<App />);

  // Example test: Check if the navigation bar is present
  const navElement = screen.getByRole("navigation");
  expect(navElement).toBeInTheDocument();
});

test("renders footer", () => {
  render(<App />);

  // Example test: Check if the footer is present
  const footerElement = screen.getByText(/© 2025 studybuddy/i);
  expect(footerElement).toBeInTheDocument();
});