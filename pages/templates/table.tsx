import { FullLayout } from "@/components/layouts/FullLayout.component";
import { BreadcrumbType } from "@/components/CustomBreadcrumb.component";
import { FilterItemType } from "@/components/tables/Table.component";
import { useDisclosure } from "@chakra-ui/react";
import { TestState } from "@/components/dashboards/TestState";

import { FilterType } from "@/constants/filter.constant";
import { useEffect, useState, useRef } from "react";

import { useParams } from "@/hooks/useParam.hook";
import { ResponsiveTable } from "@/components/tables/ResponsiveTable.component";
import { DataAction } from "@/components/DataAction.component";
import { MdSupervisedUserCircle } from "react-icons/md";
import { withAuth } from "@/hocs/withAuth";
import { AlertDialog } from "@/components/dialogs/AlertDialog.component";
import { useErrorHandler } from "@/hooks/useErrorHandler.hook";
import { customApi } from "@/services/testService";
import { TagCopy } from "@/components/tags/TagCopy.component";
import { Modal } from "@/components/modals/Modal.component";
import { MyForm } from "@/components/forms/test/Form.component";

function TablePage() {
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
    page,
    perPage,
    filters,
    q,
    includes,
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

    setData([]);

    for (let i = 0; i < 30; i++) {
      setData((prev) => {
        return [
          ...prev,
          {
            id: "wave" + i,
            name: "wave" + i,
            phone: "0123456789",
            test1: "wave" + i,
            test2: "wave" + i,
            test3: "wave" + i,
          },
        ];
      });
    }

    setDefaultFilters(defaultFilters);
    setPage(2);
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
          console.log(select);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const {
    data: test,
    error,
    reload,
    isLoading,
  } = useErrorHandler<{
    name: string;
    order: number;
  }>(
    () => customApi.customFunction(),
    [
      q,
      page,
      filters.select_option_1,
      filters.select_option_2,
      filters.date_select,
      filters.check_box,
    ]
  );

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  return (
    <>
      <FullLayout metaTag={metaTag} breadcrumbs={breadcrumbs} header={header}>
        <div className="w-full">
          <ResponsiveTable
            title="Responsive Table"
            subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            isLoading={isLoading}
            filterItems={filterItems}
            isShowIndex={false}
            customIndexTitle={"Number"}
            underFilterSection={<TestState />}
            createSection={{
              show: true,
              title: "Custom Create",
              colorSchema: "teal",
              onCreateClick: () => {
                onOpenModal();
              },
            }}
            onSearch={(value: string) => {
              setQ(value);
            }}
            data={data}
            headers={[
              {
                title: "Actions",
                key: "actions",
                width: "170px",
                align: "center",

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
                      onDeleteClick={() => {
                        onOpen();
                      }}
                    />
                  );
                },
              },
              {
                title: "ID",
                key: "id",
                align: "center",
                render: (data: any) => {
                  return <TagCopy title={data.id} />;
                },
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
              {
                title: "Test1",
                key: "test1",
              },
              {
                title: "Test2",
                key: "test2",
              },
              {
                title: "Test3",
                key: "test3",
              },
            ]}
            pagination={{
              total: data.length,
              perPage: perPage,
              currentPage: page,
              onChange: (page: number) => {
                setPage(page);
              },
            }}
          />

          <Modal
            title="Create Modal"
            isOpen={isOpenModal}
            size="sm"
            confirmButtonId="hook-form"
            confirmButtonType="submit"
            onClose={() => {
              onCloseModal();
            }}
            onConfirm={() => {
              onCloseModal();
            }}
          >
            <div>
              <MyForm
                onSuccess={(data: "wave") => {
                  console.log("onSuccess", data);
                  onCloseModal();
                }}
              />
            </div>
          </Modal>

          <AlertDialog
            title="ยืนยันการลบ"
            message="  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores consequuntur aliquid error architecto libero et cum fugit ullam optio repellat labore officiis dolorum doloremque at maxime debitis, excepturi quos ut."
            isOpen={isOpen}
            onClose={() => {
              onClose();
            }}
            onConfirm={() => {
              onClose();
            }}
            cancelRef={cancelRef}
          />
        </div>
      </FullLayout>
    </>
  );
}

export default withAuth(TablePage);
