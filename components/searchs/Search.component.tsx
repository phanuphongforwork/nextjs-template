import { InputGroup, InputLeftElement, Icon, Input } from "@chakra-ui/react";
import { MdOutlineSearch } from "react-icons/md";

type IProps = {
  onSearch?: Function;
};

export const SearchBar = ({ onSearch }: IProps) => {
  return (
    <>
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
      </InputGroup>
    </>
  );
};
