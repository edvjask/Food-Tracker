import { useAuth0 } from "@auth0/auth0-react";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return isAuthenticated ? children : loginWithRedirect({});
};
