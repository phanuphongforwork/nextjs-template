import {
  Modal as CharkaModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface IProps {
  title: string;
  isOpen: boolean;
  onClose: Function;
  onConfirm: Function;
  customFooter?: React.ReactNode;
  children?: ReactNode;
  isCentered?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  scrollBehavior?: "inside" | "outside";
  confirmButtonScheme?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isShowFooter?: boolean;
  confirmButtonId?: string;
  confirmButtonType?: "submit" | "reset" | undefined;
}

export const Modal = ({
  title,
  isOpen = false,
  onClose,
  onConfirm,
  customFooter,
  children,
  isCentered = true,
  size = "md",
  scrollBehavior = "inside",
  confirmButtonScheme = "teal",
  confirmButtonText = "ยืนยัน",
  cancelButtonText = "ยกเลิก",
  isShowFooter = true,
  confirmButtonId = "",
  confirmButtonType = undefined,
}: IProps) => {
  return (
    <CharkaModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      scrollBehavior={scrollBehavior}
      isCentered={isCentered}
      size={size}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box className="w-full">{children}</Box>
        </ModalBody>

        {isShowFooter && (
          <ModalFooter>
            {!customFooter && (
              <Box w={"full"} className="flex justify-end">
                <Button
                  colorScheme={confirmButtonScheme}
                  mr={3}
                  type={confirmButtonType}
                  form={confirmButtonId}
                  onClick={() => {
                    if (confirmButtonType !== "submit") {
                      onConfirm();
                    }
                  }}
                >
                  {confirmButtonText}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    onClose();
                  }}
                >
                  {cancelButtonText}
                </Button>
              </Box>
            )}

            {customFooter}
          </ModalFooter>
        )}
      </ModalContent>
    </CharkaModal>
  );
};
