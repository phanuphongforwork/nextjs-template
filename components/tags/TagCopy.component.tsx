import { Tag, TagRightIcon, TagLabel } from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";
import { IconType } from "react-icons";
import { useToast } from "@/hooks/useToast.hook";

interface IProps {
  title: string;
  size?: "sm" | "md" | "lg";
  colorScheme?: string;
  icon?: IconType;
  variant?: "solid" | "subtle" | "outline";
}
export const TagCopy = ({
  title = "",
  colorScheme = "teal",
  size = "md",
  icon = MdContentCopy,
  variant = "subtle",
}: IProps) => {
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(title);

    toast.showSuccessToast(`คัดลอก ${title} แล้ว!`);
  };
  return (
    <Tag
      size={size}
      variant={variant}
      colorScheme={colorScheme}
      className=" cursor-pointer"
      onClick={() => {
        handleCopy();
      }}
    >
      <TagLabel>{title}</TagLabel>
      <TagRightIcon boxSize="12px" as={icon} />
    </Tag>
  );
};
