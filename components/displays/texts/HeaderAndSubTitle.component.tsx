import { Heading, Text } from "@chakra-ui/react";

type IProps = {
  title: string;
  subtitle?: string;
};

export const HeaderAndSubTitle = ({ title, subtitle = "" }: IProps) => {
  return (
    <>
      <Heading size={"md"}>{title}</Heading>
      <Text fontSize={"md"}>{subtitle}</Text>
    </>
  );
};
