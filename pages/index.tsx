import { FullLayout } from "@/components/layouts/FullLayout.component";
import { customApi } from "@/services/testService";
import { useErrorHandler } from "@/hooks/useErrorHandler.hook";
import { useState } from "react";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";

export default function HomePage() {
  const metaTag = {
    title: "Dashboard",
  };

  const header = {
    title: "Dashboard",
    subtitle:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum earum incidunt in cum quas cupiditate quam tempore! Qui facilis inventore tempore sit, itaque ratione rem temporibus! Ex aliquam sed natus.",
  };

  const breadcrumbs: BreadcrumbType[] = [
    { name: "Dashboard", href: "/", current: true },
  ];

  // const [count, setCount] = useState<number>(0);

  // // const { data, error, reload } = useErrorHandler<{
  // //   name: string;
  // //   order: number;
  // // }>(() => customApi.customFunction(), [count], {});

  return (
    <>
      <FullLayout metaTag={metaTag} breadcrumbs={breadcrumbs} header={header}>
        <div>Home</div>
      </FullLayout>
    </>
  );
}
