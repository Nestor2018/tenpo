import authReducer, { login, logout } from "../store/authSlice";

describe("authSlice", () => {
  const initialState = {
    token: null,
    isAuthenticated: false,
  };

  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle login", () => {
    const state = authReducer(initialState, login("fake-token-123"));
    expect(state).toEqual({
      token: "fake-token-123",
      isAuthenticated: true,
    });
  });

  it("should handle logout", () => {
    const loggedInState = {
      token: "fake-token-123",
      isAuthenticated: true,
    };
    const state = authReducer(loggedInState, logout());
    expect(state).toEqual({
      token: null,
      isAuthenticated: false,
    });
  });
});
