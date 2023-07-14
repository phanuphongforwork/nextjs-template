import { Container, useBreakpointValue } from "@chakra-ui/react";
import { Meta } from "@/components/Meta.component";
import { IMetaTag } from "@/components/Meta.component";

type IProps = {
  children: React.ReactNode;
  metaTag: IMetaTag;
};

export const Layout = ({ children, metaTag }: IProps) => {
  const containerWidth = useBreakpointValue({ base: "100%" });
  return (
    <>
      <Meta {...metaTag} />
      <Container maxW={containerWidth}>{children}</Container>
    </>
  );
};
