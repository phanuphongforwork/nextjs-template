import React, { ReactNode } from "react";
import { PageCard } from "../PageCard.component";
import { Meta } from "@/components/Meta.component";
import { IMetaTag } from "@/components/Meta.component";
import { Footer } from "../footers/Footer.component";
import { menuConfig } from "@/configs/menu.config";
import { useRouter } from "next/router";
import { Logo } from "../footers/Footer.component";
import Link from "next/link";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { IconType } from "react-icons";
import {
  CustomBreadcrumb,
  BreadcrumbType,
} from "../CustomBreadcrumb.component";

export const FullLayout = ({
  children,
  metaTag,
  breadcrumbs = [],
  header = {
    title: "",
    subtitle: "",
  },
}: {
  children: ReactNode;
  metaTag: IMetaTag;
  breadcrumbs?: BreadcrumbType[];
  header?: {
    title?: string;
    subtitle?: string;
  };
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Meta {...metaTag} />
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", lg: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size={{ base: "full", md: "xs" }}
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, lg: 60 }} className=" ">
          <div className="w-full p-4 md:p-8 h-screen overflow-y-scroll">
            <div className=" w-full md:w-auto py-4 overflow-y-scroll">
              <CustomBreadcrumb items={breadcrumbs} />
            </div>

            <PageCard title={header.title} subtitle={header.subtitle}>
              {children}
            </PageCard>
          </div>
          <div className=" p-0 w-full">
            <Footer />
          </div>
        </Box>
      </Box>
    </>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const menuList = menuConfig;
  return (
    <Box
      transition="3s ease"
      className={" overflow-y-scroll pb-20 "}
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", lg: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box className=" flex flex-col gap-1">
        {menuList.map((link) => {
          if (link?.subMenu && link?.subMenu?.length > 0) {
            return (
              <div key={link.name}>
                <NavItem
                  key={link.name}
                  icon={link.icon}
                  href={link.url}
                  disabled={true}
                >
                  {link.name}
                </NavItem>

                <div className="flex flex-col gap-1 pl-8">
                  {link.subMenu.map((menu) => {
                    return (
                      <NavItem key={menu.name} icon={menu.icon} href={menu.url}>
                        {menu.name}
                      </NavItem>
                    );
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <NavItem key={link.name} icon={link.icon} href={link.url}>
                {link.name}
              </NavItem>
            );
          }
        })}
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactNode;
  disabled?: boolean;
}
const NavItem = ({
  icon,
  children,
  href,
  disabled = false,
  ...rest
}: NavItemProps) => {
  const router = useRouter();
  const path = router.asPath;

  if (disabled) {
    return (
      <Flex
        align="center"
        p="4"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor={disabled ? "default" : "pointer"}
        _hover={{
          bg: `${disabled ? "" : "gray.200"}`,
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: `${disabled ? "" : "white"}`,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  }

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor={disabled ? "default" : "pointer"}
        bg={path === href ? "gray.200" : ""}
        _hover={{
          bg: `${disabled ? "" : "gray.200"}`,
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, lg: 60 }}
      px={{ base: 4, lg: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", lg: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box display={{ base: "flex", lg: "none" }}>
        <Logo />
      </Box>

      <HStack spacing={{ base: "0", lg: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={""} />
                <VStack
                  display={{ base: "none", lg: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Microwave</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", lg: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
