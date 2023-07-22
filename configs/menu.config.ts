import { IconType } from "react-icons";
import {
  MdOutlineHome,
  MdOutlineBackupTable,
  MdOutlineInsertDriveFile,
  MdOutlineTableChart,
  MdOutlineFlipToFront,
  MdOutlineCalendarMonth,
} from "react-icons/md";
export type MenuListType = {
  name: string;
  icon: IconType;
  url: string;
  subMenu?: MenuListType[];
};

export const menuConfig: MenuListType[] = [
  {
    name: "Dashboard",
    icon: MdOutlineHome,
    url: "/",
  },
  {
    name: "Templates",
    icon: MdOutlineBackupTable,
    url: "/templates",
    subMenu: [
      {
        name: "Normal",
        icon: MdOutlineInsertDriveFile,
        url: "/templates/normal",
      },
      {
        name: "Table",
        icon: MdOutlineTableChart,
        url: "/templates/table",
      },
      {
        name: "Card",
        icon: MdOutlineFlipToFront,
        url: "/templates/card",
      },
      {
        name: "Calendar",
        icon: MdOutlineCalendarMonth,
        url: "/templates/calendar",
      },
    ],
  },
];
