import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";

import { RiArrowLeftLine } from "react-icons/ri";

// STYLES
import { Flex, Button, Stack, useToast } from "@chakra-ui/react";

// COMPONENTS
import { Input } from "../components/form/Input";
import { Radio } from "../components/form/Radio";

// SERVICES
import { registerUser } from "../services";

// TYPES
import { IRegisterUser } from "../types";

export const SignUp: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, control } = useForm();

  const [typeUser, setTypeUser] = useState("client");

  const HandleSignIn: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { apiCall } = registerUser();

      let formattedData;
      if (data.type_user === "establishment") {
        const { cpf, birth_date, type_user, ...rest } = data;

        formattedData = {
          ...rest,
          is_establishment: true,
        };
      } else {
        const { cnpj, type_user, ...rest } = data;

        formattedData = {
          ...rest,
          is_establishment: false,
        };
      }

      await apiCall(formattedData as IRegisterUser);

      toast({
        id: "success_registration",
        title: "User successfully registered",
        description: "User is already registered, now login",
        status: "success",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });

      navigate("/");
    } catch (err: any) {
      let message = (err as AxiosError<{ message: string }>)?.response?.data
        ?.message;

      toast({
        id: "error_registration",
        title: "Error when registering user",
        description:
          message || "Check the information and/or try again in a few moments",
        status: "error",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Button
        leftIcon={<RiArrowLeftLine />}
        variant="ghost"
        p="0"
        w="100%"
        maxWidth={360}
        justifyContent="flex-start"
        _hover={{
          bg: "transparent",
          color: "pink.500",
        }}
        _active={{
          bg: "transparent",
          color: "pink.500",
        }}
        onClick={() => navigate(-1)}
      >
        back
      </Button>

      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(HandleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="text"
            label="Name"
            error={formState?.errors?.name}
            {...register("name", { required: "Name required" })}
          />
          <Input
            type="email"
            label="E-mail"
            autoComplete="username"
            error={formState?.errors?.email}
            {...register("email", { required: "E-mail required" })}
          />
          <Input
            type="password"
            autoComplete="current-password"
            label="Password"
            error={formState?.errors?.password}
            {...register("password", { required: "Password required" })}
          />
          <Input
            type="password"
            autoComplete="current-password"
            label="Confirm Password"
            error={formState?.errors?.confirm_password}
            {...register("confirm_password", {
              required: "Confirm Password required",
            })}
          />
          <Input
            type="number"
            label="Telephone"
            error={formState?.errors?.tel}
            {...register("tel", { required: "Telephone required" })}
          />
          <Radio
            label="Type"
            name="type_user"
            control={control}
            defaultValue="client"
            error={formState?.errors?.type_user}
            validation={{
              required: "Type User is required",
            }}
            options={[
              { name: "Client", value: "client", colorScheme: "green" },
              {
                name: "Establishment",
                value: "establishment",
                colorScheme: "red",
              },
            ]}
            onChange={setTypeUser}
          />

          {typeUser === "client" && (
            <>
              <Input
                type="number"
                label="CPF"
                error={formState?.errors?.cpf}
                {...register("cpf", {
                  required: "CPF is required",
                  maxLength: {
                    value: 11,
                    message: "CPF must be 11 characters long",
                  },
                  minLength: {
                    value: 11,
                    message: "CPF must be 11 characters long",
                  },
                })}
              />

              <Input
                type="date"
                label="Birth Date"
                error={formState?.errors?.birth_date}
                {...register("birth_date", {
                  valueAsDate: true,
                  required: "Birth Date is required",
                })}
              />
            </>
          )}

          {typeUser === "establishment" && (
            <Input
              type="number"
              label="CNPJ"
              error={formState?.errors?.cnpj}
              {...register("cnpj", {
                required: "CNPJ is required",
                maxLength: {
                  value: 14,
                  message: "CNPJ must be 14 characters long",
                },
                minLength: {
                  value: 14,
                  message: "CNPJ must be 14 characters long",
                },
              })}
            />
          )}
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
};
