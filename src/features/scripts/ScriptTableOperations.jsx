import FilterGroup from "../../ui/FilterGroup";
import TableOperations from "../../ui/TableOperations";

const filterOptions = [
  // { value: "all", label: "All" },
  { value: "movie", label: "movie" },
  { value: "tv", label: "tv" },
];

function ScriptTableOperations({ onChange, value }) {
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

export default ScriptTableOperations;
