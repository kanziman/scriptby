import { useIntl } from "react-intl";
import FilterGroup from "../../ui/FilterGroup";
import TableOperations from "../../ui/TableOperations";

function FindOperations({ onChange, value }) {
  const intl = useIntl();
  const filterOptions = [
    {
      value: "movie",
      label: intl.formatMessage({
        id: "option.movie",
        defaultMessage: "movie",
      }),
    },
    {
      value: "tv",
      label: intl.formatMessage({ id: "option.tv", defaultMessage: "tv" }),
    },
  ];

  return (
    <TableOperations>
      <FilterGroup
        filterField="filter"
        options={filterOptions}
        onChange={onChange}
        value={value}
      />
      {/* <SortBy options={sortOptions} /> */}
    </TableOperations>
  );
}

export default FindOperations;
