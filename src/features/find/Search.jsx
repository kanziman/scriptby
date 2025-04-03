import { FaRegCircleXmark } from "react-icons/fa6";
import { useIntl } from "react-intl";

import { useRef } from "react";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import { useKey } from "../../hooks/useKey";
import FindOperations from "./FindOperations";

const SearchContainer = styled.span`
  position: relative;
  width: 42rem;
  display: flex;
  gap: 0.4rem;
`;

// InputWrapper를 추가하여 내부에 ClearButton을 절대 위치로 배치
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSearch = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  font-size: 1.6rem;
  border: none;
  border-radius: 5px;
  background-color: var(--color-grey-200);
  transition: all 0.3s;

  &::placeholder {
    color: var(--color-grey-400);
  }

  &:focus::placeholder {
    color: transparent;
  }

  @media (max-width: 34em) {
    font-size: 1.6rem;
  }
`;

// ClearButton: 입력창 오른쪽 내부에 배치
const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--color-grey-600);
  &:hover {
    color: var(--color-grey-800);
  }
`;

function Search() {
  const intl = useIntl();

  const inputEl = useRef(null);
  const { state, dispatch } = useQuery();

  // 입력 변화에 따라 query 업데이트
  const handleChange = (e) => {
    const newQuery = e.target.value;
    dispatch({
      type: "query/update",
      payload: { query: newQuery, filter: state.filter ?? "movie" },
    });
  };

  // filter 변경 핸들러
  const handleFilter = (newFilter) => {
    dispatch({
      type: "query/update",
      payload: { query: state.query, filter: newFilter },
    });
  };

  // "Enter" 키 입력 시, 입력창에 포커스하고 query 초기화
  useKey("Enter", () => {
    if (document.activeElement !== inputEl.current) {
      inputEl.current.focus();
      dispatch({
        type: "query/update",
        payload: { query: "", filter: state.filter },
      });
    }
  });

  // Clear 버튼 클릭 시 query 초기화
  const handleClear = () => {
    dispatch({
      type: "query/update",
      payload: { query: "", filter: state.filter },
    });
    if (inputEl.current) inputEl.current.focus();
  };

  return (
    <SearchContainer>
      <InputWrapper>
        <StyledSearch
          type="text"
          placeholder={intl.formatMessage({
            id: "search.placeHolder",
          })}
          value={state.query || ""}
          onChange={handleChange}
          ref={inputEl}
        />
        {
          <ClearButton onClick={handleClear}>
            <FaRegCircleXmark />
          </ClearButton>
        }
      </InputWrapper>
      <FindOperations onChange={handleFilter} value={state.filter || ""} />
    </SearchContainer>
  );
}

export default Search;
