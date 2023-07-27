import { FullLayout } from "@/components/layouts/FullLayout.component";
import { CustomTable } from "@/components/tables/Table.component";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";
import { FilterItemType } from "@/components/tables/Table.component";
import { Badge } from "@chakra-ui/react";
import { TestState } from "@/components/dashboards/TestState";

import { FilterType } from "@/constants/filter.constant";
import { useEffect, useState } from "react";

import { useParams } from "@/hooks/useParam.hook";
import { ResponsiveTable } from "@/components/tables/ResponsiveTable.component";
import { DataAction } from "@/components/DataAction.component";
import { MdSupervisedUserCircle } from "react-icons/md";

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

  const {
    setQ,
    setIncludes,
    setFilters,
    setDefaultFilters,
    setPage,
    ...param
  } = useParams();

  const defaultFilters: Record<string, any> = {
    select_option_1: "option1",
    select_option_2: "",
    date_select: "2023-07-25",
    check_box: true,
  };

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setIncludes(["wave", "Phanupjong"]);

    for (let i = 0; i < 11; i++) {
      setData((prev) => {
        return [
          ...prev,
          {
            id: "wave" + i,
            name: "wave" + i,
            phone: "0123456789",
          },
        ];
      });
    }

    setDefaultFilters(defaultFilters);
    setPage(5);
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
          <ResponsiveTable
            title="Responsive Table"
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            filterItems={filterItems}
            isShowIndex={false}
            customIndexTitle={"Number"}
            underFilterSection={<TestState />}
            createSection={{
              show: true,
              title: "Custom Create",
              colorSchema: "teal",
              onCreateClick: () => {
                alert("create");
              },
            }}
            data={data}
            headers={[
              {
                title: "Actions",
                key: "actions",
                render: () => {
                  return (
                    <DataAction
                      isShowDeleteSection={true}
                      isShowEditSection={true}
                      isShowViewSection={true}
                      customActions={[
                        {
                          groupTitle: "Custom",
                          groupMenu: [
                            {
                              isShow: true,
                              name: "Test",
                              icon: MdSupervisedUserCircle,
                              onClick: () => {},
                            },
                            {
                              isShow: true,
                              name: "Test",
                              icon: MdSupervisedUserCircle,
                              onClick: () => {},
                            },
                          ],
                        },
                      ]}
                      // customViewLists={[
                      //   {
                      //     isShow: true,
                      //     name: "wave",
                      //     icon: MdSupervisedUserCircle,
                      //   },
                      // ]}
                      // customDeleteLists={[
                      //   {
                      //     isShow: true,
                      //     name: "wave",
                      //     icon: MdSupervisedUserCircle,
                      //   },
                      // ]}
                      // customEditLists={[
                      //   {
                      //     isShow: true,
                      //     name: "wave",
                      //     icon: MdSupervisedUserCircle,
                      //   },
                      //   {
                      //     isShow: true,
                      //     name: "wave",
                      //     icon: MdSupervisedUserCircle,
                      //   },
                      // ]}
                    />
                  );
                },
              },
              {
                title: "ID",
                key: "id",
              },
              {
                title: "Name",
                key: "name",

                render: (data: any) => {
                  return <>{data.name + ";;;;"}</>;
                },
              },
              {
                title: "Phone",
                key: "phone",
              },
            ]}
            pagination={{
              total: data.length,
              perPage: 10,
              onChange: (page: number) => {
                setPage(page);
              },
            }}
          />
        </div>
      </FullLayout>
    </>
  );
}
