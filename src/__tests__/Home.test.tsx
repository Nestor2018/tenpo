import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";
import configureStore from "redux-mock-store";
import Home from "../pages/Home";
import { logout } from "../store/authSlice";
import * as api from "../services/api";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

describe("Home", () => {
  const mockPosts = [
    { id: 1, title: "Post 1", body: "Body 1" },
    { id: 2, title: "Post 2", body: "Body 2" },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    jest.spyOn(api, "fetchPosts").mockResolvedValue({
      posts: mockPosts,
      total: 2000,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders posts and logout button", async () => {
    const store = mockStore({
      auth: { token: "fake-token", isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });

  it("loads more posts on button click", async () => {
    const store = mockStore({
      auth: { token: "fake-token", isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Cargar más")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Cargar más"));

    await waitFor(() => {
      expect(api.fetchPosts).toHaveBeenCalledWith(2, 10);
    });
  });

  it("dispatches logout and navigates", async () => {
    const store = mockStore({
      auth: { token: "fake-token", isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(logout());
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
