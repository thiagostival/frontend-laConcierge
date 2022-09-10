import { useNavigate } from "react-router-dom";

// STYLES
import { Button, Flex } from "@chakra-ui/react";

// COMPONENTS
import { Logo } from "../components/Logo";

export function UnauthHeader() {
  const navigate = useNavigate();

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      px="6"
      align="center"
    >
      <Button
        bg="transparent"
        _hover={{
          bg: "transparent",
        }}
        _active={{
          bg: "transparent",
        }}
        w="max-content"
        maxWidth={64}
        onClick={() => navigate("/")}
      >
        <Logo />
      </Button>

      <Flex align="center" ml="auto">
        <Button
          bg="pink.500"
          _hover={{
            bg: "pink.300",
          }}
          color="white"
          onClick={() => navigate("/")}
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
}
