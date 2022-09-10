import { Text, Image } from "@chakra-ui/react";

import icon from "../../../assets/icon.png";

export function Logo() {
  return (
    <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
      <Image src={icon} width="16" />
    </Text>
  );
}
