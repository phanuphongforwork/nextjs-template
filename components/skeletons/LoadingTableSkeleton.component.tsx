import { Stack, Skeleton } from "@chakra-ui/react";

type IProps = {};

export const LoadingTableSkeleton = ({}: IProps) => {
  return (
    <Stack className="w-full">
      <Skeleton height="90px" />
      <Skeleton height="90px" />
      <Skeleton height="90px" />
      <Skeleton height="90px" />
      <Skeleton height="90px" />
    </Stack>
  );
};
