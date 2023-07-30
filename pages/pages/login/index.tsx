import { FullLayout } from "@/components/layouts/FullLayout.component";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";
import { Box } from "@chakra-ui/react";
import { LoginPage } from "@/components/pages/logins/LoginPage.component";

export default function loginPage() {
  const metaTag = {
    title: "Login",
  };

  const header = {
    title: "Login Page Example",
    subtitle: "",
  };

  const breadcrumbs: BreadcrumbType[] = [
    { name: "Pages", href: "#", current: true },
    { name: "Login", href: "/pages/login", current: true },
  ];

  return (
    <FullLayout metaTag={metaTag} breadcrumbs={breadcrumbs} header={header}>
      <Box className="flex justify-center items-center ">
        <LoginPage />
      </Box>
    </FullLayout>
  );
}
