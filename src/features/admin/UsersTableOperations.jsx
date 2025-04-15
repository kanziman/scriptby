import FilterGroup from "../../ui/FilterGroup.tsx";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "requested", label: "Requested" },
  { value: "student", label: "Student" },
  { value: "tutor", label: "Tutor" },
];
const sortOptions = [
  { value: "created_at-desc", label: "Join date (desc)" },
  { value: "created_at-asc", label: "Join date (asc)" },
  { value: "username-desc", label: "Name (Z-A)" },
  { value: "username-asc", label: "Name (A-Z)" },
  // { value: "scripts-asc", label: "Sort by scripts (low first)" },
  // { value: "scripts-desc", label: "Sort by scripts (high first)" },
];

function UsersTableOperations() {
  return (
    <TableOperations>
      <FilterGroup filterField="play" options={filterOptions} />

      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default UsersTableOperations;
