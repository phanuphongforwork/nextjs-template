import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  Icon,
  Select,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  Tag,
  Text,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Tooltip,
} from "@chakra-ui/react";
import {
  MdAddCircleOutline,
  MdRefresh,
  MdFilterList,
  MdArrowDropUp,
  MdArrowDropDown,
} from "react-icons/md";
import { Pagination } from "../Pagination.component";
import { SearchBar } from "../searchs/Search.component";
import { HeaderAndSubTitle } from "../displays/texts/HeaderAndSubTitle.component";
import { FilterConstant, FilterType } from "@/constants/filter.constant";
import { DatetimePicker } from "../date-time-pickers/DatetimePicker.component";
import React, { useEffect, useState, useMemo } from "react";
import { IconType } from "react-icons";
import { LoadingTableSkeleton } from "../skeletons/LoadingTableSkeleton.component";
import debounce from "lodash/debounce";
import { Modal } from "../modals/Modal.component";
import classNames from "classnames";
import { useReactFormHook } from "@/hooks/useReactFormHook.hook";
import * as yup from "yup";

type SortFormValue = {
  key: string;
  direction: "asc" | "desc";
};

const schema = yup
  .object({
    key: yup.string().required(),
    direction: yup.string().required(),
  })
  .required();

type Header = {
  key: string;
  title: string;
  render?: Function;
  width?: string;
  align?: "left" | "center" | "right";
  isSort?: boolean;
};

type VerticalTableType = {
  data: any[];
  headers: Header[];
  isShowIndex: boolean;
  customIndexTitle: string;
  variant: string;
  colorSchema: string;
  size: string;
  isLoading?: boolean;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
};

type NormalTableType = {
  data: any[];
  headers: Header[];
  isShowIndex: boolean;
  customIndexTitle: string;
  variant: string;
  colorSchema: string;
  size: string;
  isLoading?: boolean;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
};

export type SelectOptionType = { value: string; label: string };

export type FilterItemType = {
  field: string;
  title: string;
  placeholder?: string;
  type?: "select" | "date" | "checkbox";
  select?: {
    selectValue: string;
    selectOptions: SelectOptionType[];
    onSelect: Function;
  };
  date?: {
    selectValue: string;
    onSelect: Function;
  };
  checkbox?: {
    selectValue: boolean;
    checkBoxValue: string | boolean | number;
    onSelect: Function;
  };
}[];

export type IResponsiveTableType = {
  variant?: string;
  colorSchema?: string;
  size?: string;
  headers: Header[];
  data: any[];
  isLoading?: boolean;
  isShowIndex?: boolean;
  customIndexTitle?: string;
  filterItems?: FilterItemType;
  title?: string;
  subtitle?: string;
  onSearch?: Function;
  createSection?: {
    show: boolean;
    title?: string;
    icon?: IconType;
    onCreateClick?: Function;
    colorSchema?: string;
  };
  underFilterSection?: React.ReactNode;
  noDataSecton?: {
    title?: string;
    subtitle?: string;
  };
  pagination?: {
    total?: number;
    perPage?: number;
    siblingCount?: number;
    currentPage?: number;
    onChange?: Function;
  };
  defaultSortColumn?: string | null;
  defaultSortDirection?: "asc" | "desc";
  onSort?: Function;
};

const onSelectionChange = (
  value: string | number | boolean,
  onSelect?: Function
) => {
  if (onSelect) {
    onSelect(value || "");
  }
};

export const ResponsiveTable = ({
  variant = "striped",
  colorSchema = "gray",
  size = "lg",
  headers,
  data,
  isShowIndex = false,
  isLoading = false,
  customIndexTitle = "#",
  filterItems = [],
  title = "",
  subtitle = "",
  createSection = {
    show: true,
    title: "Create",
    icon: MdAddCircleOutline,
    colorSchema: "teal",
    onCreateClick: () => {},
  },
  pagination,
  underFilterSection,
  noDataSecton,
  onSearch,
  onSort,
  defaultSortColumn,
  defaultSortDirection,
}: IResponsiveTableType) => {
  const isVerticalTable = useBreakpointValue({ base: true, lg: false });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    setTotal(pagination?.total || 0);
    setPage(pagination?.currentPage || 1);
    setPerPage(pagination?.perPage || 10);
  }, [pagination!.total]);

  const { handleSubmit, register, formState, reset, setValue } =
    useReactFormHook<SortFormValue>({
      defaultValues: {
        key: defaultSortColumn ?? "",
        direction: defaultSortDirection ?? "asc",
      },
      schema,
    });

  const [sortKey, setSortKey] = useState<string>(defaultSortColumn ?? "");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection ?? "asc"
  );

  const sortColumns = useMemo(() => {
    return headers?.filter((header) => {
      return header?.isSort;
    });
  }, []);

  const { errors } = formState;

  const onSubmit = async (data: SortFormValue): Promise<void> => {
    if (onSort) {
      setSortKey(data.key);
      setSortDirection(data.direction);
      onSort(data);
    }

    handleCloseSortModal();
  };

  const handleCloseSortModal = () => {
    onClose();
  };

  return (
    <Box w={"full"}>
      <Box
        className="w-full py-4 flex flex-col md:flex-row gap-4 justify-between px-4 bg-white mt-4 shadow-sm"
        rounded={"lg"}
      >
        <Box className="flex flex-col w-full">
          <Box className=" flex flex-col md:flex-row md:justify-between justify-start">
            <Box maxW={"500px"}>
              {title && <HeaderAndSubTitle title={title} subtitle={subtitle} />}
            </Box>

            <Box className=" flex gap-2 items-center">
              {/* <Box mt={{ base: 4, md: 0 }}>
                <IconButton
                  variant="outline"
                  aria-label="open menu"
                  icon={<MdRefresh />}
                />
              </Box> */}
              <Box className="w-full md:w-auto" mt={{ base: 4, md: 0 }}>
                {createSection?.show && (
                  <Button
                    className="w-full"
                    colorScheme={createSection?.colorSchema ?? "teal"}
                    leftIcon={
                      <Icon as={createSection?.icon ?? MdAddCircleOutline} />
                    }
                    onClick={() => {
                      if (createSection?.onCreateClick) {
                        createSection?.onCreateClick();
                      }
                    }}
                  >
                    {createSection?.title}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          <Box w={"full"} bg={"white"} rounded={"lg"} mt={{ base: 8, md: 8 }}>
            <Box className="flex gap-2 flex-col md:flex-row">
              <Box className=" w-full">
                <SearchBar
                  onSearch={(search: string) => {
                    if (onSearch) {
                      debounce(() => {
                        onSearch(search);
                      }, 500)();
                    }
                  }}
                />
              </Box>
              <Box mt={{ base: 4, md: 0 }} className="w-full md:w-auto">
                <Tooltip
                  hasArrow
                  label={`${
                    sortKey
                      ? `${sortKey} : ${
                          sortDirection === "asc"
                            ? "น้อยไปหามาก"
                            : "มากไปหาน้อย"
                        }`
                      : ""
                  }`}
                  bg="gray.300"
                  color="black"
                >
                  <Button
                    className="w-full"
                    rightIcon={<Icon as={MdFilterList} />}
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    เรียงลำดับ
                  </Button>
                </Tooltip>
              </Box>
            </Box>

            {filterItems && filterItems?.length > 0 && (
              <>
                <Box
                  mt={4}
                  className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full"
                >
                  {filterItems.map((filter) => {
                    const type = filter?.type
                      ? filter.type
                      : FilterConstant.type.select;
                    if (type === FilterConstant.type.select) {
                      return (
                        <Box key={filter.field}>
                          <Text>{filter.title}</Text>
                          <Select
                            className="cursor-pointer mt-1"
                            placeholder={filter?.placeholder || ""}
                            onChange={(event) => {
                              onSelectionChange(
                                event.target.value,
                                filter?.select?.onSelect as Function
                              );
                            }}
                            defaultValue={filter?.select?.selectValue}
                          >
                            {filter?.select?.selectOptions?.map(
                              (select, index) => {
                                return (
                                  <option key={index} value={select.value}>
                                    {select.label}
                                  </option>
                                );
                              }
                            )}
                          </Select>
                        </Box>
                      );
                    }

                    if (type === FilterConstant.type.date) {
                      return (
                        <Box key={filter.field}>
                          <Text>{filter.title}</Text>
                          <Box mt={1}>
                            <DatetimePicker
                              date={filter?.date?.selectValue}
                              onSelect={(
                                event: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                if (filter?.date?.onSelect) {
                                  filter?.date?.onSelect(event);
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      );
                    }

                    if (type === FilterConstant.type.checkbox) {
                      return (
                        <Box key={filter.field} mt={{ base: 0, md: 8 }}>
                          <Checkbox
                            value={filter?.checkbox?.checkBoxValue as string}
                            colorScheme="teal"
                            defaultChecked={
                              filter.checkbox?.selectValue as boolean
                            }
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (filter?.checkbox?.onSelect) {
                                filter?.checkbox?.onSelect(
                                  event.target.checked
                                );
                              }
                            }}
                          >
                            {filter.title}
                          </Checkbox>
                        </Box>
                      );
                    }
                  })}
                </Box>
              </>
            )}
          </Box>

          <Box mt={6} pb={2} className="w-full">
            {underFilterSection}
          </Box>
        </Box>
      </Box>
      <Box w="full" mt={4}>
        {isVerticalTable &&
          verticalTable({
            data,
            headers,
            isShowIndex,
            customIndexTitle,
            variant,
            colorSchema,
            size,
            isLoading,
            sortKey,
            sortDirection,
          })}
      </Box>
      <Box w="full" mt={4}>
        {!isVerticalTable &&
          normalTable({
            data,
            headers,
            isShowIndex,
            customIndexTitle,
            variant,
            colorSchema,
            size,
            isLoading,
            sortKey,
            sortDirection,
          })}
      </Box>

      {!data?.length && (
        <Box w={"full"} pb={8}>
          <Alert
            colorScheme="whiteAlpha"
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {noDataSecton?.title ?? "No data Rows..."}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {noDataSecton?.subtitle ?? "Now, you can add your own data rows."}
            </AlertDescription>
          </Alert>
        </Box>
      )}
      <Box mt={2} className="fixed md:static bottom-0 w-full right-0">
        <Pagination
          totalCount={total}
          pageSize={perPage}
          currentPage={page}
          setCurrentPage={(page: number) => {
            setPage(page);

            if (pagination?.onChange) {
              pagination?.onChange(page);
            }
          }}
        />
      </Box>

      <Modal
        title="เรียงลำดับข้อมูล"
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        onConfirm={() => {}}
        confirmButtonId="sort-form"
        confirmButtonType="submit"
      >
        <form id="sort-form" onSubmit={handleSubmit(onSubmit)}>
          <Box className="grid grid-cols-1 gap-4">
            <Box>
              <FormControl isInvalid={!!errors.key?.message}>
                <FormLabel>ข้อมูลที่ต้องการเรียงลำดับ</FormLabel>
                <Select {...register("key")}>
                  {sortColumns.map((column, index) => {
                    return (
                      <option key={index} value={column.key}>
                        {column.title}
                      </option>
                    );
                  })}
                </Select>

                <FormErrorMessage>{errors?.key?.message}</FormErrorMessage>
              </FormControl>
            </Box>

            <Box>
              <FormControl isInvalid={!!errors.direction?.message}>
                <FormLabel>การเรียงลำดับ</FormLabel>
                <Select {...register("direction")}>
                  <option value="asc"> น้อยไปหามาก</option>
                  <option value="desc"> มากไปหาน้อย</option>
                </Select>

                <FormErrorMessage>
                  {errors?.direction?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
        </form>
      </Modal>
    </Box>
  );
};

const verticalTable = ({
  data = [],
  headers = [],
  isShowIndex,
  customIndexTitle,
  variant,
  colorSchema,
  size,
  isLoading,
  sortKey,
  sortDirection,
}: VerticalTableType) => {
  return (
    <TableContainer
      bg={"white"}
      px={2}
      className=" shadow-md rounded-lg"
      py={2}
    >
      <Table variant={variant} colorScheme={colorSchema} size={size}>
        <Tbody className="grid grid-cols-1 gap-8">
          {!isLoading &&
            data?.map((row: any, index: number) => {
              return (
                <Tr key={index}>
                  {isShowIndex && (
                    <Td className="flex w-full">
                      <Box className="w-1/3 font-bold">{customIndexTitle}</Box>
                      <Box className="w-2/3 font-bold">{index + 1}</Box>
                    </Td>
                  )}

                  {headers.map((header, index) => {
                    return (
                      <Td className="flex w-full" key={header.title + index}>
                        <Box className="w-1/3 font-bold flex gap-1">
                          <Box className="flex gap-2 items-center">
                            <Box>{header.title}</Box>
                            {sortKey === header.key &&
                              sortDirection === "asc" && (
                                <Icon
                                  as={MdArrowDropUp}
                                  fill={"teal"}
                                  boxSize={8}
                                />
                              )}
                            {sortKey === header.key &&
                              sortDirection === "desc" && (
                                <Icon
                                  as={MdArrowDropDown}
                                  fill={"teal"}
                                  boxSize={8}
                                />
                              )}
                          </Box>
                        </Box>
                        <Box className="w-2/3 flex flex-row items-center whitespace-normal">
                          <Box className="line-clamp-3 w-full ">
                            {header?.render
                              ? header.render(row)
                              : row[header.key]}
                          </Box>
                        </Box>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
      {isLoading && <LoadingTableSkeleton />}
    </TableContainer>
  );
};

const normalTable = ({
  data,
  headers = [],
  isShowIndex,
  customIndexTitle,
  variant,
  colorSchema,
  size,
  isLoading,
  sortKey,
  sortDirection,
}: NormalTableType) => {
  return (
    <TableContainer
      bg={"white"}
      px={2}
      py={2}
      className=" shadow-md rounded-lg"
    >
      <Table
        variant={variant}
        colorScheme={colorSchema}
        size={size}
        __css={{ tableLayout: "fixed", width: "full" }}
      >
        <Thead cursor={"pointer"}>
          <Tr>
            {isShowIndex && <Th className="font-bold ">{customIndexTitle}</Th>}

            {headers.map((header, index) => {
              return (
                <Th
                  key={index}
                  className="font-bold"
                  style={{ width: header?.width || "auto" }}
                >
                  <Box
                    className={classNames(
                      "w-full flex items-center",
                      `justify-${header?.align || "left"}`
                    )}
                  >
                    <Box className="flex gap-2 items-center">
                      <Box>{header.title}</Box>
                      {sortKey === header.key && sortDirection === "asc" && (
                        <Icon as={MdArrowDropUp} fill={"teal"} boxSize={8} />
                      )}
                      {sortKey === header.key && sortDirection === "desc" && (
                        <Icon as={MdArrowDropDown} fill={"teal"} boxSize={8} />
                      )}
                    </Box>
                  </Box>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {!isLoading &&
            data?.map((row, index) => {
              return (
                <Tr key={index} height="10px">
                  {isShowIndex && <Td className="font-bold">{index + 1}</Td>}

                  {headers?.map((header, index) => {
                    return (
                      <Td
                        key={index}
                        style={{
                          width: header?.width || "auto",
                        }}
                        className="whitespace-normal"
                      >
                        <Box
                          maxH={"100px"}
                          className={classNames(
                            "line-clamp-3 flex flex-row items-center",
                            `justify-${header?.align || "left"}`
                          )}
                        >
                          {header?.render
                            ? header.render(row)
                            : row[header.key]}
                        </Box>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
        </Tbody>
      </Table>

      {isLoading && <LoadingTableSkeleton />}
    </TableContainer>
  );
};
