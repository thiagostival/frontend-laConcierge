import { Navigate, Outlet, useLocation } from "react-router-dom";
import { parseCookies } from "nookies";

// STYLES
import { Flex } from "@chakra-ui/react";

// COMPONENTS
import { UnauthHeader } from "../../components/headers/UnauthHeader";

/**
 * NOTE:
 * Outlet shows where the specific content of a page should be inserted
 */
export function DefaultLayout() {
  const location = useLocation();
  const { "reactauth.token": token } = parseCookies();

  if (location.pathname.includes("/") && token) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return (
    <Flex w="100vw" h="100vh" direction="column">
      <UnauthHeader />

      <Outlet />
    </Flex>
  );
}
