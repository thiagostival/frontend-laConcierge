import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { RiAddLine, RiPencilLine } from "react-icons/ri";

// HOOKS
import { useAuth } from "../contexts/AuthContext";

// STYLES
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

// COMPONENTS
import { Pagination } from "../components/Pagination";

export function UserList() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const users = useMemo(() => (!!user ? [user] : []), [user]);

  return (
    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Users
        </Heading>

        <Button
          size="sm"
          fontSize="small"
          colorScheme="pink"
          onClick={() => navigate("create-user")}
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
        >
          Create new
        </Button>
      </Flex>

      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px="6" color="gray.300" w="8">
              <Checkbox colorScheme="pink" />
            </Th>
            <Th>Users</Th>
            <Th>Registration date</Th>
            <Th w="8"></Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map((u, idx) => (
            <Tr key={`${u?.email}-${idx}`}>
              <Td px="6">
                <Checkbox colorScheme="pink" />
              </Td>

              <Td>
                <Box>
                  <Text fontWeight="bold">{u?.name}</Text>
                  <Text fontSize="small" color="gray.300">
                    {u?.email}
                  </Text>
                </Box>
              </Td>

              <Td>April 04, 2021</Td>

              <Td>
                <Button
                  as="a"
                  size="sm"
                  fontSize="small"
                  colorScheme="purple"
                  leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                >
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination />
    </Box>
  );
}
