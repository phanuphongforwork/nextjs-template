import {
  InputGroup,
  InputLeftElement,
  Select,
  Icon,
  Input,
  Box,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";

type IProps = {
  onSearch?: Function;
};

export const SearchBar = ({ onSearch }: IProps) => {
  return (
    <Box className="flex">
      <InputGroup className="w-full">
        <InputLeftElement pointerEvents="none">
          <Icon as={MdOutlineSearch} color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onSearch) {
              onSearch(event.target.value);
            }
          }}
        />
        {/* <InputRightElement width={"full"} maxW={"300px"}>
          <Select placeholder="Select option" className="w-full">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </InputRightElement> */}
      </InputGroup>
    </Box>
  );
};
