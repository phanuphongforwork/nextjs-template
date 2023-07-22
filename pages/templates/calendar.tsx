import { FullLayout } from "@/components/layouts/FullLayout.component";
import { useState } from "react";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";

export default function CalendarPage() {
  const metaTag = {
    title: "Template Calendar",
  };

  const header = {
    title: "Normal Calendar",
  };

  const breadcrumbs: BreadcrumbType[] = [
    { name: "Templates Calendar", href: "/templates/calendar", current: true },
  ];

  return (
    <>
      <FullLayout metaTag={metaTag} breadcrumbs={breadcrumbs} header={header}>
        <div>Template Calendar</div>
      </FullLayout>
    </>
  );
}
