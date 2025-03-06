import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Agregar temporalmente
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import PrivateRoute from "../routes/PrivateRoute";

const mockStore = configureStore([]);

describe("PrivateRoute", () => {
  it("renders children when authenticated", () => {
    const store = mockStore({
      auth: { token: "fake-token", isAuthenticated: true },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<div>Protected Content</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to login when not authenticated", () => {
    const store = mockStore({ auth: { token: null, isAuthenticated: false } });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<div>Protected Content</div>} />
            </Route>
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
