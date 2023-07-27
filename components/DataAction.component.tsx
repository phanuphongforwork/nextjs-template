import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { MdList, MdVisibility, MdEdit, MdDelete } from "react-icons/md";
import { IconType } from "react-icons";
import some from "lodash/some";

type ListType = {
  isShow: boolean;
  name: string;
  icon: IconType;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
  onClick?: Function;
};

type ListActionType = {
  groupTitle: string;
  groupMenu: ListType[];
};

type IProps = {
  colorScheme?: string;
  icon?: IconType;
  isShowViewSection?: boolean;
  isShowEditSection?: boolean;
  isShowDeleteSection?: boolean;
  onViewClick?: Function;
  onEditClick?: Function;
  onDeleteClick?: Function;
  isShowView?: boolean;
  isShowEdit?: boolean;
  isShowDelete?: boolean;
  viewTitle?: string;
  editTitle?: string;
  deleteTitle?: string;
  customViewLists?: ListType[];
  customEditLists?: ListType[];
  customDeleteLists?: ListType[];
  customActions?: ListActionType[];
};

export const DataAction = ({
  colorScheme = "teal",
  icon = MdList,
  isShowViewSection = true,
  isShowEditSection = true,
  isShowDeleteSection = true,
  isShowView = true,
  isShowEdit = true,
  isShowDelete = true,
  onViewClick,
  onEditClick,
  onDeleteClick,
  viewTitle = "View Data",
  editTitle = "Edit Data",
  deleteTitle = "Delete Data",
  customViewLists = [],
  customEditLists = [],
  customDeleteLists = [],
  customActions = [],
}: IProps) => {
  const isHaveActiveCustomEditLists = some(customEditLists, { isShow: true });
  const isHaveActiveCustomDeleteLists = some(customDeleteLists, {
    isShow: true,
  });
  const isHaveActiveCustomViewLists = some(customViewLists, { isShow: true });

  const checkHasSomeActiveInCustomActions = (list: ListType[]) => {
    return some(list, { isShow: true });
  };
  return (
    <>
      <Menu size={"lg"}>
        <MenuButton
          as={IconButton}
          icon={<Icon as={icon} boxSize={5} />}
          colorScheme={colorScheme}
        />
        <MenuList>
          {isShowViewSection && (isShowView || isHaveActiveCustomViewLists) && (
            <MenuGroup title={viewTitle}>
              {isShowView && (
                <MenuItem
                  className="h-12"
                  onClick={() => {
                    if (onViewClick) {
                      onViewClick();
                    }
                  }}
                  icon={<Icon as={MdVisibility} boxSize={5} />}
                >
                  {viewTitle}
                </MenuItem>
              )}

              {customViewLists.map((list, index) => {
                if (list?.isShow) {
                  return (
                    <MenuItem
                      className="h-12"
                      key={index}
                      icon={
                        <Icon
                          as={list.icon}
                          fill={list?.iconColor || undefined}
                          boxSize={5}
                        />
                      }
                      bg={list?.bgColor || undefined}
                      color={list?.textColor || undefined}
                      onClick={() => {
                        if (list?.onClick) {
                          list.onClick();
                        }
                      }}
                    >
                      {list.name}
                    </MenuItem>
                  );
                }
              })}
            </MenuGroup>
          )}

          {isShowViewSection && (isShowView || isHaveActiveCustomViewLists) && (
            <MenuDivider />
          )}

          {isShowEditSection && (isShowEdit || isHaveActiveCustomEditLists) && (
            <MenuGroup title={editTitle}>
              {isShowEdit && (
                <MenuItem
                  className="h-12"
                  onClick={() => {
                    if (onEditClick) {
                      onEditClick();
                    }
                  }}
                  icon={<Icon as={MdEdit} boxSize={5} />}
                >
                  {editTitle}
                </MenuItem>
              )}
              {customEditLists.map((list, index) => {
                if (list?.isShow) {
                  return (
                    <MenuItem
                      className="h-12"
                      key={index}
                      icon={
                        <Icon
                          as={list.icon}
                          fill={list?.iconColor || undefined}
                          boxSize={5}
                        />
                      }
                      bg={list?.bgColor || undefined}
                      color={list?.textColor || undefined}
                      onClick={() => {
                        if (list?.onClick) {
                          list.onClick();
                        }
                      }}
                    >
                      {list.name}
                    </MenuItem>
                  );
                }
              })}
            </MenuGroup>
          )}
          {isShowEditSection && (isShowEdit || isHaveActiveCustomEditLists) && (
            <MenuDivider />
          )}

          {customActions?.map((group, index) => {
            if (checkHasSomeActiveInCustomActions(group.groupMenu)) {
              return (
                <Box key={index}>
                  <MenuGroup title={group.groupTitle}>
                    {group?.groupMenu?.map((list, index) => {
                      if (list?.isShow) {
                        return (
                          <MenuItem
                            className="h-12"
                            key={index}
                            onClick={() => {
                              if (list?.onClick) {
                                list.onClick();
                              }
                            }}
                            icon={
                              <Icon
                                as={list.icon}
                                fill={list.iconColor}
                                boxSize={5}
                              />
                            }
                            bg={list?.bgColor || undefined}
                            color={list?.textColor || undefined}
                          >
                            {list.name}
                          </MenuItem>
                        );
                      }
                    })}
                  </MenuGroup>
                </Box>
              );
            }
          })}

          {isShowDeleteSection &&
            (isShowDelete || isHaveActiveCustomDeleteLists) &&
            customActions?.length &&
            some(
              customActions.map((group) => {
                return some(group?.groupMenu, { isShow: true });
              }, true)
            ) && <MenuDivider />}

          {isShowDeleteSection &&
            (isShowDelete || isHaveActiveCustomDeleteLists) && (
              <MenuGroup title={deleteTitle}>
                {isShowDelete && (
                  <MenuItem
                    className="h-12"
                    onClick={() => {
                      if (onDeleteClick) {
                        onDeleteClick();
                      }
                    }}
                    icon={<Icon as={MdDelete} fill={"red.500"} boxSize={5} />}
                  >
                    {deleteTitle}
                  </MenuItem>
                )}

                {customDeleteLists.map((list, index) => {
                  if (list?.isShow) {
                    return (
                      <MenuItem
                        className="h-12"
                        key={index}
                        icon={
                          <Icon
                            as={list.icon}
                            fill={list?.iconColor || "red.500"}
                            boxSize={5}
                          />
                        }
                        bg={list?.bgColor || undefined}
                        color={list?.textColor || undefined}
                        onClick={() => {
                          if (list?.onClick) {
                            list.onClick();
                          }
                        }}
                      >
                        {list.name}
                      </MenuItem>
                    );
                  }
                })}
              </MenuGroup>
            )}

          {/* {isShowEditSection && (isShowEdit || isHaveActiveCustomEditLists) && (
            <MenuDivider />
          )} */}
        </MenuList>
      </Menu>
    </>
  );
};
