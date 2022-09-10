import React, { forwardRef, ForwardRefRenderFunction } from "react";
import {
  Radio as RadioChackra,
  RadioGroup,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Control, Controller, FieldValues } from "react-hook-form";

interface IRadioProps {
  name: string;
  control: Control<FieldValues, any>;
  options: Array<{ name: string; value: string; colorScheme: string }>;
  defaultValue?: string;
  label?: string;
  error?: any;
  validation?: any;
  onChange?: (value: string) => void;
}

const RadioBase: ForwardRefRenderFunction<HTMLDivElement, IRadioProps> = (
  { name, label, error, options, control, defaultValue, validation, onChange },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup
            id={name}
            {...field}
            onChange={(value) => {
              onChange?.(value);
              field.onChange(value);
            }}
          >
            <Stack spacing={5} direction="row">
              {options.map((opt) => (
                <RadioChackra
                  key={opt.value}
                  colorScheme={opt.colorScheme}
                  value={opt.value}
                >
                  {opt.name}
                </RadioChackra>
              ))}
            </Stack>
          </RadioGroup>
        )}
        rules={validation}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Radio = forwardRef(RadioBase);
