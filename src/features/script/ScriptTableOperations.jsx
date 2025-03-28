import FilterGroup from "../../ui/FilterGroup";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movie" },
  { value: "tv", label: "Tv" },
];
const sortOptions = [
  { value: "created_at-desc", label: "created (desc)" },
  { value: "created_at-asc", label: "created (asc)" },
  { value: "original_name-desc", label: "title (Z-A)" },
  { value: "original_name-asc", label: "title (A-Z)" },
];

function ScriptTableOperations() {
  return (
    <TableOperations>
      <FilterGroup filterField="category" options={filterOptions} />

      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default ScriptTableOperations;
