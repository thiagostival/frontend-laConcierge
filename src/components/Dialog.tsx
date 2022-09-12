import { useCallback, useRef } from "react";

// STYLES
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  ButtonProps,
  ModalBodyProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalOverlayProps,
  useDisclosure,
} from "@chakra-ui/react";

interface IDialogProps {
  trigger: {
    value: string;
    props?: ButtonProps;
  };
  header: {
    value: string;
    props?: ModalHeaderProps;
  };
  body: {
    value: string;
    props?: ModalBodyProps;
  };
  cancelBtn?: {
    show: boolean;
    value?: string;
    props?: ButtonProps;
  };
  confirmBtn?: {
    value?: string;
    props?: ButtonProps;
  };
  dialogProps?: AlertDialogProps;
  overlayProps?: ModalOverlayProps;
  contentProps?: ModalContentProps;
  handleConfirm?: () => void;
  handleCancel?: () => void;
}

export function Dialog({
  trigger,
  header,
  body,
  cancelBtn = {
    show: false,
  },
  confirmBtn = {
    value: "Confirm",
  },
  dialogProps,
  overlayProps = {},
  contentProps = {},
  handleConfirm = () => {},
  handleCancel = () => {},
}: IDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const confirm = useCallback(() => {
    handleConfirm();
    onClose();
  }, [handleConfirm, onClose]);

  const cancel = useCallback(() => {
    handleCancel();
    onClose();
  }, [handleCancel, onClose]);

  return (
    <>
      <Button colorScheme="red" {...trigger?.props} onClick={onOpen}>
        {trigger.value}
      </Button>

      <AlertDialog
        {...(dialogProps || {})}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay {...overlayProps}>
          <AlertDialogContent {...contentProps}>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              {...header?.props}
            >
              {header.value}
            </AlertDialogHeader>

            <AlertDialogBody {...body?.props}>{body.value}</AlertDialogBody>

            <AlertDialogFooter>
              {cancelBtn.show && (
                <Button {...cancelBtn?.props} ref={cancelRef} onClick={cancel}>
                  {cancelBtn?.value || "Cancel"}
                </Button>
              )}

              <Button
                colorScheme="red"
                ml={3}
                {...confirmBtn?.props}
                onClick={confirm}
              >
                {confirmBtn.value}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
