import { FullLayout } from "@/components/layouts/FullLayout.component";
import { CustomTable } from "@/components/tables/Table.component";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";
import { FilterItemType } from "@/components/tables/Table.component";

import { FilterType } from "@/constants/filter.constant";
import { useEffect, useState } from "react";

import { useParams } from "@/hooks/useParam.hook";

export default function TablePage() {
  const metaTag = {
    title: "Template Table",
  };
  const header = {
    title: "Template Table",
    subtitle:
      " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus assumenda tenetur incidunt, magnam vel hic quia dolorem provident aliquam illum vitae suscipit nemo ea reprehenderit fugit possimus cumque dolorum! Molestias!",
  };

  const breadcrumbs: BreadcrumbType[] = [
    { name: "Templates Table", href: "/templates/table", current: true },
  ];

  const { setQ, setIncludes, setFilters, setDefaultFilters, ...param } =
    useParams();

  const defaultFilters: Record<string, any> = {
    select_option_1: "option1",
    select_option_2: "",
    date_select: "2023-07-25",
    check_box: true,
  };

  useEffect(() => {
    setIncludes(["wave", "Phanupjong"]);
    setDefaultFilters(defaultFilters);
  }, []);

  const filterItems: FilterItemType = [
    {
      field: "select_option_1",
      title: "Select",
      placeholder: "All",
      type: FilterType.select,
      select: {
        selectValue: defaultFilters.select_option_1,
        selectOptions: [
          {
            label: "Option 1",
            value: "option1",
          },
        ],
        onSelect: (select: string) => {
          setFilters("select_option_1", select);
        },
      },
    },
    {
      field: "select_option_2",
      title: "Select",
      placeholder: "All",
      type: FilterType.select,
      select: {
        selectValue: defaultFilters.select_option_2,
        selectOptions: [
          {
            label: "Option 2",
            value: "option2",
          },
        ],
        onSelect: (select: string) => {
          setFilters("select_option_2", select);
        },
      },
    },
    {
      field: "date_select",
      title: "Date Selector",
      type: FilterType.date,
      date: {
        selectValue: defaultFilters.date_select,
        onSelect: (select: string) => {
          setFilters("date_select", select);
        },
      },
    },
    {
      field: "check_box",
      title: "CheckBox Select",
      type: FilterType.checkbox,
      checkbox: {
        selectValue: defaultFilters.check_box,
        checkBoxValue: "wave",
        onSelect: (select: string) => {
          setFilters("check_box", select);
        },
      },
    },
  ];

  return (
    <>
      <FullLayout metaTag={metaTag} breadcrumbs={breadcrumbs} header={header}>
        <div className="w-full">
          <CustomTable
            filterItems={filterItems}
            onSearch={(value: string) => {
              setQ(value);
            }}
          />
        </div>
      </FullLayout>
    </>
  );
}
