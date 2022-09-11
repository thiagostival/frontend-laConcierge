import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Stack,
  StackProps,
} from "@chakra-ui/react";

export interface InputProps extends ChakraInputProps {
  name: string;
  StackProps?: StackProps;
  labelProps?: FormLabelProps;
  label?: string;
  error?: any;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, labelProps, StackProps, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <Stack {...StackProps}>
        {!!label && (
          <FormLabel htmlFor={name} {...labelProps}>
            {label}
          </FormLabel>
        )}

        <ChakraInput
          id={name}
          name={name}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          size="lg"
          _hover={{
            bgColor: "gray.900",
          }}
          ref={ref}
          {...rest}
        />
      </Stack>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
