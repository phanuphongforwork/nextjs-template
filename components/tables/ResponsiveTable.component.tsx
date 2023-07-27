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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { MdAddCircleOutline, MdRefresh } from "react-icons/md";
import { Pagination } from "../Pagination.component";
import { SearchBar } from "../searchs/Search.component";
import { HeaderAndSubTitle } from "../displays/texts/HeaderAndSubTitle.component";
import { FilterConstant, FilterType } from "@/constants/filter.constant";
import { DatetimePicker } from "../date-time-pickers/DatetimePicker.component";

type Header = {
  key: string;
  title: string;
  render?: Function;
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
  headers: Header[];
  data: any[];
  isShowIndex?: boolean;
  customIndexTitle?: string;
  filterItems?: FilterItemType;
};

const onSelectionChange = (
  value: string | number | boolean,
  defaultValue: string | number | boolean,
  onSelect?: Function
) => {
  defaultValue = value;
  if (onSelect) {
    onSelect(value || "");
  }
};

export const ResponsiveTable = ({
  headers,
  data,
  isShowIndex = false,
  customIndexTitle = "#",
  filterItems = [],
}: IResponsiveTableType) => {
  const isVerticalTable = useBreakpointValue({ base: true, lg: false });

  return (
    <Box w={"full"}>
      <Box
        className="w-full py-4 flex flex-col md:flex-row gap-4 justify-between px-4 bg-white mt-4"
        rounded={"lg"}
      >
        <Box className="flex flex-col w-full">
          <Box className=" flex flex-col md:flex-row md:justify-between justify-start">
            <Box maxW={"500px"}>
              <HeaderAndSubTitle
                title="Table Header"
                subtitle="    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro vitae esse cum necessitatibus quas, suscipit aliquam libero, non laudantium nostrum sit illo? Ex temporibus magni nihil nulla distinctio maiores minima!"
              />
            </Box>

            <Box className="w-full md:w-auto" mt={{ base: 4, md: 0 }}>
              <Button
                className="w-full"
                colorScheme="teal"
                leftIcon={<Icon as={MdAddCircleOutline} />}
              >
                Create
              </Button>
            </Box>
          </Box>

          <Box w={"full"} bg={"white"} rounded={"lg"} mt={{ base: 8, md: 4 }}>
            <Box>
              <SearchBar />
            </Box>
            {filterItems && filterItems?.length > 0 && (
              <>
                <Box className="w-full py-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5 items-center">
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
                                filter?.select?.selectValue || "",
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
                              onSelect={filter?.date?.onSelect}
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

          <Box className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-8 mt-8">
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </Box>
        </Box>
      </Box>
      <Box w="full">
        {isVerticalTable &&
          verticalTable({ data, headers, isShowIndex, customIndexTitle })}
      </Box>
      {!isVerticalTable &&
        normalTable({ data, headers, isShowIndex, customIndexTitle })}
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
              No data Rows...
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Now, you can add your own data rows.
            </AlertDescription>
          </Alert>
        </Box>
      )}
      <Pagination />
    </Box>
  );
};

const verticalTable = ({
  data = [],
  headers = [],
  isShowIndex,
  customIndexTitle,
}: {
  data: any[];
  headers: Header[];
  isShowIndex: boolean;
  customIndexTitle: string;
}) => {
  return (
    <TableContainer bg={"white"} px={2}>
      <Table variant="striped" colorScheme="gray" size={"md"}>
        <Tbody className="grid grid-cols-1 gap-8">
          {data?.map((row: any, index: number) => {
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
                      <Box className="w-1/3 font-bold">{header.title}</Box>
                      <Box className="w-2/3">
                        {header?.render ? header.render(row) : row[header.key]}
                      </Box>
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const normalTable = ({
  data,
  headers = [],
  isShowIndex,
  customIndexTitle,
}: {
  data: any[];
  headers: Header[];
  isShowIndex: boolean;
  customIndexTitle: string;
}) => {
  return (
    <TableContainer bg={"white"} px={2}>
      <Table variant="striped" colorScheme="gray" size={"lg"}>
        <Thead>
          <Tr>
            {isShowIndex && <Th className="font-bold">{customIndexTitle}</Th>}

            {headers.map((header, index) => {
              return (
                <Th key={index} className=" font-bold">
                  {header.title}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((row, index) => {
            return (
              <Tr key={index}>
                {isShowIndex && <Td className="font-bold">{index + 1}</Td>}

                {headers?.map((header, index) => {
                  return (
                    <Td key={index}>
                      {header?.render ? header.render(row) : row[header.key]}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
