import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import FilterGroup from "../../ui/FilterGroup";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import ScriptCheckBox from "./ScriptCheckBox";

function ScriptTableOperations() {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = [
    {
      value: "created_at-desc",
      label: intl.formatMessage({
        id: "sortOptions.created.desc",
      }),
    },
    {
      value: "created_at-asc",
      label: intl.formatMessage({
        id: "sortOptions.created.asc",
      }),
    },
    {
      value: "original_name-desc",
      label: intl.formatMessage({
        id: "sortOptions.title.desc",
      }),
    },
    {
      value: "original_name-asc",
      label: intl.formatMessage({
        id: "sortOptions.title.asc",
      }),
    },
  ];
  const filterOptions = [
    {
      value: "all",
      label: intl.formatMessage({
        id: "option.all",
      }),
    },
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
  useEffect(() => {
    if (!searchParams.has("status")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("status", "confirmed");
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams]);

  const getConfirmationState = () => searchParams.get("status") || "confirmed";
  const isChecked = () => getConfirmationState() === "confirmed";
  const handleCheckboxChange = () => {
    const current = getConfirmationState();
    const newValue = current === "confirmed" ? "pending" : "confirmed";
    const newParams = new URLSearchParams(searchParams);
    newParams.set("status", newValue);
    setSearchParams(newParams);
  };

  return (
    <TableOperations>
      <FilterGroup
        size="small"
        filterField="category"
        options={filterOptions}
      />
      <SortBy options={sortOptions} />

      {/* 체크박스 추가 */}
      <ScriptCheckBox
        label={intl.formatMessage({
          id: "status.confirmed",
        })}
        onChange={handleCheckboxChange}
        checked={isChecked()}
      />
    </TableOperations>
  );
}

export default ScriptTableOperations;
