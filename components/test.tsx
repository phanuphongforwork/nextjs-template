import { useState } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem,
  Text,
  Icon,
  Link,
} from "@chakra-ui/react";
import { RiArrowDropDownLine, RiArrowRightLine } from "react-icons/ri"; // You can use any other icon from react-icons library.

const VerticalNavbar = () => {
  const [activeMenu, setActiveMenu] = useState(""); // Store the active menu item
  const [activeSubmenu, setActiveSubmenu] = useState(""); // Store the active submenu item

  const handleMenuClick = (menuName: string) => {
    if (activeMenu === menuName) {
      setActiveMenu(""); // Collapse active menu if clicked again
    } else {
      setActiveMenu(menuName); // Expand the clicked menu
    }
  };

  const handleSubmenuClick = (submenuName: string) => {
    if (activeSubmenu === submenuName) {
      setActiveSubmenu(""); // Collapse active submenu if clicked again
    } else {
      setActiveSubmenu(submenuName); // Expand the clicked submenu
    }
  };

  const isMenuExpanded = (menuName: string) => {
    return activeMenu === menuName;
  };

  const isSubmenuExpanded = (submenuName: string) => {
    return activeSubmenu === submenuName;
  };

  return (
    <Box bg="gray.200" w="200px" h="100vh" p={4}>
      <Accordion allowToggle>
        {/* List menu without sub-menu */}
        <AccordionItem>
          <AccordionButton onClick={() => handleMenuClick("menu1")}>
            <Box flex="1" textAlign="left">
              <Icon as={RiArrowRightLine} mr={2} />
              Menu 1
            </Box>
          </AccordionButton>
        </AccordionItem>

        {/* List menu with sub-menu */}
        <AccordionItem>
          <h2>
            <AccordionButton onClick={() => handleMenuClick("menu2")}>
              <Box flex="1" textAlign="left">
                <Box flex="1">{/* Placeholder for arrow icon spacing */}</Box>
                <Icon
                  as={
                    isMenuExpanded("menu2")
                      ? RiArrowDropDownLine
                      : RiArrowRightLine
                  }
                  mr={2}
                />
                Menu 2
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            display={isMenuExpanded("menu2") ? "block" : "none"}
          >
            <UnorderedList listStyleType="none" ml="4">
              <ListItem>
                <Link
                  href="#"
                  color={
                    isSubmenuExpanded("submenu1") ? "teal.500" : "gray.600"
                  }
                  onClick={() => handleSubmenuClick("submenu1")}
                >
                  Submenu 1
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="#"
                  color={
                    isSubmenuExpanded("submenu2") ? "teal.500" : "gray.600"
                  }
                  onClick={() => handleSubmenuClick("submenu2")}
                >
                  Submenu 2
                </Link>
              </ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default VerticalNavbar;
