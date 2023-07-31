import { FullLayout } from "@/components/layouts/FullLayout.component";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";
import { Box } from "@chakra-ui/react";
import { SettingPage } from "@/components/pages/settings/SettingPage.component";

export default function Permission() {
  const metaTag = {
    title: "Permission",
  };

  const header = {
    title: "Permission Page Example",
    subtitle: "",
  };

  const breadcrumbs: BreadcrumbType[] = [
    { name: "Pages", href: "#", current: true },
    { name: "Permission", href: "/pages/permission", current: true },
  ];

  return (
    <FullLayout metaTag={metaTag} breadcrumbs={breadcrumbs} header={header}>
      <div>Permission</div>
    </FullLayout>
  );
}
