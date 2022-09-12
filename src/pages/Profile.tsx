import { useCallback, useMemo, useState } from "react";

// STYLES
import {
  Button,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";

import { Input } from "../components/form/Input";

// HOOKS
import { useAuth } from "../contexts/AuthContext";

// SERVICES
import { deleteUser } from "../services";
import { Dialog } from "../components/Dialog";

export function Profile() {
  const { user, signOut } = useAuth();

  const toast = useToast();

  if (!user) return <div />;

  const [deleting, setDeleting] = useState(false);

  const birth_date = useMemo(() => {
    if (!user.birth_date) return "";

    const year = new Date(user.birth_date).getFullYear();
    const month = new Date(user.birth_date).getMonth() + 1;
    const day = new Date(user.birth_date).getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
  }, [user?.birth_date]);

  const handleDelete = useCallback(async () => {
    try {
      setDeleting(true);

      const { apiCall } = deleteUser();
      await apiCall();

      signOut();

      setDeleting(false);
    } catch (error) {
      setDeleting(false);

      if (!toast.isActive("fail_delete_user")) {
        toast({
          id: "fail_delete_user",
          title: "Failed to delete account",
          description:
            "There was a problem deleting account. Please try again later!",
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }
    }
  }, [toast, signOut]);

  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input
            type="text"
            name="Name"
            label="Name"
            isReadOnly
            defaultValue={user.name}
          />
          <Input
            type="email"
            label="E-mail"
            name="E-mail"
            isReadOnly
            defaultValue={user.email}
          />
          <Input
            type="number"
            label="Telephone"
            name="Telephone"
            isReadOnly
            defaultValue={user.tel}
          />

          <RadioGroup
            id="type_user"
            value={user?.is_establishment ? "establishment" : "client"}
          >
            <Stack spacing={5} direction="row">
              <Radio colorScheme="green" value="client">
                Client
              </Radio>
              <Radio colorScheme="red" value="establishment">
                Establishment
              </Radio>
            </Stack>
          </RadioGroup>

          {!user.is_establishment && (
            <>
              <Input
                type="number"
                label="CPF"
                name="CPF"
                isReadOnly
                defaultValue={user.cpf}
              />

              <Input
                type="date"
                label="Birth Date"
                name="Birth Date"
                isReadOnly
                defaultValue={birth_date}
              />
            </>
          )}

          {user.is_establishment && (
            <Input
              type="number"
              label="CNPJ"
              name="CNPJ"
              isReadOnly
              defaultValue={user.cnpj}
            />
          )}
        </Stack>

        <Dialog
          trigger={{
            value: "Delete Account",
            props: {
              isLoading: deleting,
              marginTop: "5",
            },
          }}
          header={{
            value: "Delete Account",
            props: {
              color: "gray.900",
            },
          }}
          body={{
            value: "Are you sure? You can't undo this action afterwards.",
            props: {
              color: "gray.900",
            },
          }}
          cancelBtn={{
            show: true,
            props: {
              color: "gray.900",
            },
          }}
          handleConfirm={handleDelete}
        />
      </Flex>
    </Flex>
  );
}
