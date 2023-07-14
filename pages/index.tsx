import { Layout } from "@/components/layouts/layout.component";
import { FullLayout } from "@/components/layouts/full-layout.component";
import { customApi } from "@/services/testService";
import { useErrorHandler } from "@/hooks/useErrorHandler.hook";
import { useState } from "react";

export default function Home() {
  const metaTag = {
    title: "Test",
  };

  const [count, setCount] = useState<number>(0);

  const { data, error, reload } = useErrorHandler<{
    name: string;
    order: number;
  }>(() => customApi.customFunction(), [count], {
    // showSuccessFetchingMessage: {
    //   show: true,
    //   message: "wave",
    //   description: "53w5x",
    // },
  });

  return (
    <>
      <FullLayout metaTag={metaTag}>
        <div
          onClick={() => {
            reload();
          }}
        >
          Home
        </div>
      </FullLayout>
    </>
  );
}
