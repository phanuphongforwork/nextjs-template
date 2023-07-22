import { useState, useEffect } from "react";
import _ from "lodash";

type FilterObject = Record<string, any>;

type SearchParams = {
  q: string;
  includes: string;
  filters: FilterObject;
};

export const useParams = () => {
  const [q, setQ] = useState<string>("");
  const [includes, setIncludes] = useState<string>("");
  const [filters, setFilters] = useState<FilterObject>({});

  const setQParam = (search: string) => {
    if (search !== undefined) {
      setQ(search);
    }
    // Remove 'q' key from filters if 'search' is not provided or empty
    if (!search || search === "") {
      const { q: _q, ...updatedFilters } = filters;
      setFilters(updatedFilters);
    }
  };

  const setIncludesParam = (includes: string[]) => {
    if (includes !== undefined) {
      if (Array.isArray(includes) && includes.length > 0) {
        setIncludes(includes.join(","));
      } else {
        setIncludes("");
      }
    }
    // Remove 'includes' key from filters if 'includes' is not provided or empty
    if (!includes || (Array.isArray(includes) && includes.length === 0)) {
      const { includes: _includes, ...updatedFilters } = filters;
      setFilters(updatedFilters);
    }
  };

  const setFiltersParam = (key: string, value: string) => {
    setFilters((prevFilters) => {
      if (value !== undefined && value !== null && value !== "") {
        return {
          ...prevFilters,
          [key]: value,
        };
      } else {
        const { [key]: _removedKey, ...updatedFilters } = prevFilters;
        return updatedFilters;
      }
    });
  };

  const setDefaultFilters = (defaultFilters: FilterObject) => {
    setFilters(defaultFilters);
  };
  const filterDTO = (filters: FilterObject) => {
    let data: any = {};
    for (const filter in filters) {
      if (
        !_.isEmpty(filters[filter]) ||
        typeof filters[filter] === "boolean" ||
        typeof filters[filter] === "number"
      ) {
        data[filter] = filters[filter];
      }
    }

    return data;
  };

  return {
    q,
    includes,
    filters: filterDTO(filters),
    setQ: setQParam,
    setIncludes: setIncludesParam,
    setFilters: setFiltersParam,
    setDefaultFilters,
  };
};
