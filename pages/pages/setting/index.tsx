import { FullLayout } from "@/components/layouts/FullLayout.component";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";
import { Box } from "@chakra-ui/react";
import { SettingPage } from "@/components/pages/settings/SettingPage.component";

export default function Setting() {
  const metaTag = {
    title: "Setting",
  };

  const header = {
    title: "Setting Page Example",
    subtitle: "",
  };

  const breadcrumbs: BreadcrumbType[] = [
    { name: "Pages", href: "#", current: true },
    { name: "Setting", href: "/pages/settings", current: true },
  ];

  return (
    <FullLayout metaTag={metaTag} breadcrumbs={breadcrumbs} header={header}>
      <SettingPage />
    </FullLayout>
  );
}
