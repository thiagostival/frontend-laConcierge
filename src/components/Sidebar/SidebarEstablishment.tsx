import { Box, Stack } from "@chakra-ui/react";
import { RiDashboardLine } from "react-icons/ri";

// COMPONENTS
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBarEstablishment() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink icon={RiDashboardLine} to="/establishment/dashboard">
            Dashboard
          </NavLink>
        </NavSection>
      </Stack>
    </Box>
  );
}
