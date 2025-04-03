import { useIntl } from "react-intl";
import FilterGroup from "../../ui/FilterGroup";
import TableOperations from "../../ui/TableOperations";

// const sortOptions = [
//   { value: "name-asc", label: "Sort by name (A-Z)" },
//   { value: "name-desc", label: "Sort by name (Z-A)" },
//   { value: "regularPrice-asc", label: "Sort by price (low first)" },
//   { value: "regularPrice-desc", label: "Sort by price (high first)" },
//   { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
//   { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
// ];

function DashboardOperations() {
  const intl = useIntl();
  const filterOptions = [
    {
      value: "movie",
      label: intl.formatMessage({
        id: "option.movie",
      }),
    },
    {
      value: "tv",
      label: intl.formatMessage({ id: "option.tv" }),
    },
  ];
  return (
    <TableOperations>
      <FilterGroup filterField="type" options={filterOptions} />

      {/* <SortBy options={sortOptions} /> */}
    </TableOperations>
  );
}

export default DashboardOperations;
