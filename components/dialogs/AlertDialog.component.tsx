import {
  AlertDialog as CharkaAlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import { Logo } from "../footers/Footer.component";

type IProps = {
  onClose: Function;
  onConfirm: Function;
  cancelRef: any;
  isOpen: boolean;
  isCentered?: boolean;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  confirmButtonScheme?: string;
  render?: React.ReactNode;
};

export const AlertDialog = ({
  onClose,
  onConfirm,
  cancelRef,
  isOpen,
  isCentered = true,
  title,
  message,
  cancelText = "ยกเลิก",
  confirmText = "ยืนยัน",
  confirmButtonScheme = "red",
  render,
}: IProps) => {
  return (
    <>
      <CharkaAlertDialog
        leastDestructiveRef={cancelRef}
        onClose={() => {
          onClose();
        }}
        isOpen={isOpen}
        isCentered={isCentered}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{render ? render : message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                onClose();
              }}
            >
              {cancelText}
            </Button>
            <Button
              colorScheme={confirmButtonScheme}
              ml={3}
              onClick={() => {
                onConfirm();
              }}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </CharkaAlertDialog>
    </>
  );
};
