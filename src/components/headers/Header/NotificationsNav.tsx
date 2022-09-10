import { HStack, Icon } from "@chakra-ui/react";
import {
  RiLogoutCircleLine,
  RiNotificationLine,
  RiUserAddLine,
} from "react-icons/ri";

// HOOKS
import { useAuth } from "../../../contexts/AuthContext";

export function NotificationsNav() {
  const { signOut } = useAuth();

  return (
    <HStack
      spacing="8"
      mx="8"
      pr="8"
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon as={RiNotificationLine} />
      <Icon as={RiUserAddLine} />
      <Icon
        as={RiLogoutCircleLine}
        onClick={signOut}
        _hover={{ cursor: "pointer" }}
      />
    </HStack>
  );
}
