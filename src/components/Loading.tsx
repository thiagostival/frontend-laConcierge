import { Flex, Spinner, SpinnerProps } from "@chakra-ui/react";

export function Loading({ ...rest }: SpinnerProps) {
  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      <Spinner {...rest} />
    </Flex>
  );
}
