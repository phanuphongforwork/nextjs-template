import { FullLayout } from "@/components/layouts/FullLayout.component";
import { useState } from "react";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";

export default function CardPage() {
  const metaTag = {
    title: "Template Card",
  };

  const header = {
    title: "Normal Card",
  };

  const breadcrumbs: BreadcrumbType[] = [
    { name: "Templates Card", href: "/templates/card", current: true },
  ];

  return (
    <>
      <FullLayout metaTag={metaTag} breadcrumbs={breadcrumbs} header={header}>
        <div>Template Card</div>
      </FullLayout>
    </>
  );
}
