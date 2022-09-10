import { Navigate, useLocation, Outlet } from "react-router-dom";
import { parseCookies } from "nookies";

// HOOKS
import { useAuth } from "../../contexts/AuthContext";

// STYLES
import { Flex } from "@chakra-ui/react";

// COMPONENTS
import { Header } from "../../components/headers/Header";
import { SideBarClient, SideBarEstablishment } from "../../components/Sidebar";

export const AuthLayout = () => {
  const location = useLocation();
  const { "reactauth.token": token } = parseCookies();

  // HOOKS AUTH
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated && !token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        {!user?.is_establishment && <SideBarClient />}
        {user?.is_establishment && <SideBarEstablishment />}

        <Outlet />
      </Flex>
    </Flex>
  );
};
