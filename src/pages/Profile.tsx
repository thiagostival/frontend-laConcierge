import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { CancelTokenSource } from "axios";

// STYLES
import {
  Avatar,
  Flex,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Input as ChakraInput,
} from "@chakra-ui/react";

import { Input } from "../components/form/Input";

// HOOKS
import { useAuth } from "../contexts/AuthContext";

// SERVICES
import { deleteUser, updateAvatar } from "../services";
import { Dialog } from "../components/Dialog";

export function Profile() {
  const { user, signOut, refreshUser } = useAuth();

  const toast = useToast();

  if (!user) return <div />;

  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const signalDeleting = useRef<CancelTokenSource>();
  const signalUpdating = useRef<CancelTokenSource>();

  const birth_date = useMemo(() => {
    if (!user.birth_date) return "";

    const year = new Date(user.birth_date).getFullYear();
    const month = new Date(user.birth_date).getMonth() + 1;
    const day = new Date(user.birth_date).getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
  }, [user?.birth_date]);

  const handleDelete = useCallback(async () => {
    try {
      const { source, apiCall } = deleteUser();

      setDeleting(true);
      signalDeleting.current = source;

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

  const handleUpdateAvatar = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const { source, apiCall } = updateAvatar();

        setUpdating(true);
        signalUpdating.current = source;

        if (!e.target.files?.length) return;
        const file = e.target.files[0];

        await apiCall(file);
        await refreshUser();

        setUpdating(false);
      } catch (error) {
        setUpdating(false);

        if (!toast.isActive("fail_update_user")) {
          toast({
            id: "fail_update_user",
            title: "Failed to update avatar",
            description:
              "There was a problem updating avatar. Please try again later!",
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        }
      }
    },
    [refreshUser]
  );

  useEffect(() => {
    return () => {
      signalUpdating?.current?.cancel?.("Request Canceled");
      signalDeleting?.current?.cancel?.("Request Canceled");
    };
  }, []);

  return (
    <Flex direction="column" w="100vw" align="center" marginTop="20">
      <Stack gap="4" align="center">
        <InputGroup justifyContent="center">
          <Avatar size="xl" name={user?.name} src={user?.avatar_url} />
          <ChakraInput
            type="file"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*"
            cursor="pointer"
            onChange={handleUpdateAvatar}
            isDisabled={updating || deleting}
          />
        </InputGroup>

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
                isDisabled: updating || deleting,
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
      </Stack>
    </Flex>
  );
}
