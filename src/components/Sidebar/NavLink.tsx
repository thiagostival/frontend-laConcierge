import { ElementType } from "react";
import { Link as ReactRouterLink, To } from "react-router-dom";

// STYLES
import {
  Icon,
  Link,
  Text,
  LinkProps as ChackraLinkProps,
} from "@chakra-ui/react";

interface NavLinkProps extends ChackraLinkProps {
  children: string;
  icon: ElementType;
  to?: To;
}

export function NavLink({ children, icon, ...rest }: NavLinkProps) {
  return (
    <Link as={ReactRouterLink} display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
