// STYLES
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

// HOOKS
import { useAuth } from "../../../contexts/AuthContext";

export function Profile() {
  const { user } = useAuth();

  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>{user?.name}</Text>
        <Text color="gray.300" fontSize="small">
          {user?.email}
        </Text>
      </Box>

      <Avatar size="md" name={user?.name} src={user?.avatar_url} />
    </Flex>
  );
}
