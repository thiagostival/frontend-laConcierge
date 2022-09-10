import { Box, Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";

// COMPONENTS
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarClient() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink icon={RiDashboardLine} to="/client/dashboard">
            Dashboard
          </NavLink>

          <NavLink icon={RiContactsLine} to="/client/reservas">
            Reservas
          </NavLink>
        </NavSection>
      </Stack>
    </Box>
  );
}
