import React from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// STYLES
import { Flex, Button, Stack } from "@chakra-ui/react";

// COMPONENTS
import { Input } from "../components/form/Input";

// HOOKS
import { useAuth } from "../contexts/AuthContext";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm();

  const { signIn } = useAuth();

  const HandleSignIn: SubmitHandler<FieldValues> = async (data) => {
    await signIn({ email: data.email, password: data.password });
  };

  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
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
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Log in
        </Button>

        <Button
          type="button"
          mt="6"
          size="lg"
          colorScheme="pink"
          variant="outline"
          onClick={() => navigate("/signup")}
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
};
