import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import {
  useColorModeValue,
  Heading,
  Text,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";

type IProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export const PageCard = ({ children, subtitle = "", title = "" }: IProps) => {
  const containerWidth = useBreakpointValue({ base: "100%", md: "70%" });
  return (
    <>
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        w={"full"}
        h="screen"
        rounded={"lg"}
        className=" min-h-screen"
        p={{ base: 2, md: 4 }}
      >
        {title && title !== "" && (
          <Box className="w-full">
            <Heading>{title}</Heading>
          </Box>
        )}
        <Box className={`max-w-[${containerWidth}]`}>
          {subtitle && subtitle !== "" && <Text>{subtitle}</Text>}
        </Box>
        {(title || subtitle) && <Divider mt={4} />}
        <Box w="full" mt={4}>
          {children}
        </Box>
      </Box>
    </>
  );
};
