import { Icon } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export type BreadcrumbType = {
  name: string;
  href: string;
  current?: boolean;
};

type IProps = {
  items?: BreadcrumbType[];
};

export const CustomBreadcrumb = ({ items = [] }: IProps) => {
  return (
    <nav className="flex w-full p-2 " aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {items && items.length > 0 && (
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Icon
                  as={FaHome}
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
              </a>
            </div>
          </li>
        )}

        {items &&
          items.length > 0 &&
          items.map((page) => (
            <Link href={page.href} key={page.name}>
              <li>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>

                  <div
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 line-clamp-1"
                    aria-current={page.current ? "page" : undefined}
                  >
                    {page.name}
                  </div>
                </div>
              </li>
            </Link>
          ))}
      </ol>
    </nav>
  );
};
