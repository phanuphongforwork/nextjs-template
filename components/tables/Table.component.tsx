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
  Text,
  Checkbox,
} from "@chakra-ui/react";

import { MdAddCircleOutline, MdRefresh } from "react-icons/md";
import { FilterConstant, FilterType } from "@/constants/filter.constant";

import { Pagination } from "../Pagination.component";
import { SearchBar } from "../searchs/Search.component";
import { HeaderAndSubTitle } from "../displays/texts/HeaderAndSubTitle.component";
import { DatetimePicker } from "../date-time-pickers/DatetimePicker.component";
import { useDayjs } from "@/hooks/useDayjs.hook";

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

type IProps = {
  onClickRefresh?: Function;
  filterItems?: FilterItemType;
  onSearch?: Function;
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

export const CustomTable = ({
  onClickRefresh,
  filterItems = [],
  onSearch,
}: IProps) => {
  const dayjs = useDayjs();
  return (
    <>
      <Box className="w-full py-4 flex flex-col md:flex-row gap-4 justify-between ">
        <SearchBar
          onSearch={(value: string) => {
            if (onSearch) {
              onSearch(value);
            }
          }}
        />

        <Button
          className="w-full md:w-auto"
          colorScheme="gray"
          rightIcon={<Icon as={MdRefresh} />}
          onClick={() => {
            if (onClickRefresh) {
              onClickRefresh();
            }
          }}
        >
          Refresh
        </Button>
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
                      {filter?.select?.selectOptions?.map((select, index) => {
                        return (
                          <option key={index} value={select.value}>
                            {select.label}
                          </option>
                        );
                      })}
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
                      defaultChecked={filter.checkbox?.selectValue as boolean}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        if (filter?.checkbox?.onSelect) {
                          filter?.checkbox?.onSelect(event.target.checked);
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

      <Box
        className="w-full py-4 flex flex-col md:flex-row gap-4 justify-between px-4 bg-white mt-4"
        rounded={"lg"}
      >
        <Box className="flex flex-col w-full">
          <HeaderAndSubTitle title="Table Header" />

          <Box className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-4">
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
        <Box className="w-full md:w-auto">
          <Button
            className="w-full"
            colorScheme="teal"
            leftIcon={<Icon as={MdAddCircleOutline} />}
          >
            Create
          </Button>
        </Box>
      </Box>
      <TableContainer bg={"white"} px={2} rounded={"lg"}>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination />
    </>
  );
};
