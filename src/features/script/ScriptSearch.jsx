import { useEffect, useRef, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useKey } from "../../hooks/useKey";
import ScriptTableOperations from "./ScriptTableOperations";

const SearchContainer = styled.div`
  display: flex;
  /* max-width: 80rem; */
  width: 100%;
  gap: 1rem;
  flex-wrap: wrap;

  @media (${(props) => props.theme.media.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 28rem;
  height: 4rem; /* 고정된 높이 설정 */

  @media (${(props) => props.theme.media.tablet}) {
    width: 100%;
    min-width: 100%;
  }
`;

const StyledSearch = styled.input`
  width: 100%;
  height: 100%; /* 부모의 높이를 상속 */
  padding: 0.8rem;
  font-size: 1.7rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 6px;
  background-color: var(--color-grey-200);
  transition: all 0.3s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(var(--color-brand-rgb), 0.1);
  }

  &::placeholder {
    color: var(--color-grey-400);
  }

  &:focus::placeholder {
    color: transparent;
  }

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.6rem;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--color-grey-500);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    color: var(--color-grey-800);
    background-color: var(--color-grey-300);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-brand-600);
  }
`;

const OperationsWrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: end;

  @media (${(props) => props.theme.media.tablet}) {
    width: 100%;
  }
`;

// 간단한 useDebounce 훅 (입력값이 delay(ms) 동안 변경되지 않으면 debouncedValue 업데이트)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function ScriptSearch() {
  const intl = useIntl();
  const inputEl = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에 저장된 query를 초기값으로 사용하고 로컬 상태 관리
  const initialQuery = searchParams.get("query") || "";
  const [localQuery, setLocalQuery] = useState(initialQuery);

  // 500ms 동안 입력이 없으면 debouncedQuery 값 업데이트
  const debouncedQuery = useDebounce(localQuery, 500);

  // debouncedQuery가 변경될 때마다 URL의 searchParams 업데이트 (showId, epNumber는 제거)
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    params.query = debouncedQuery;
    delete params.showId;
    delete params.epNumber;
    // setSearchParams(params);
    setSearchParams(params, { replace: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // 입력값 변경 시 로컬 상태 업데이트
  const handleChange = (e) => {
    setLocalQuery(e.target.value);
  };

  // Clear 버튼 클릭 시 로컬 상태와 URL 모두 초기화
  const handleClear = () => {
    setLocalQuery("");
    const params = Object.fromEntries(searchParams.entries());
    params.query = "";
    delete params.showId;
    delete params.epNumber;
    setSearchParams(params);
    // setSearchParams(params, { replace: true });

    if (inputEl.current) inputEl.current.focus();
  };

  // "Enter" 키 입력 시 입력창에 포커스
  useKey("Enter", () => {
    if (document.activeElement !== inputEl.current) {
      inputEl.current.focus();
    }
  });

  return (
    <SearchContainer>
      <InputWrapper>
        <StyledSearch
          type="text"
          placeholder={intl.formatMessage({
            id: "search.scripts",
          })}
          value={localQuery}
          onChange={handleChange}
          ref={inputEl}
          aria-label={intl.formatMessage({ id: "search.scripts" })}
        />
        {localQuery && (
          <ClearButton
            onClick={handleClear}
            aria-label={
              intl.formatMessage({ id: "search.clear" }) || "Clear search"
            }
          >
            <FaRegCircleXmark />
          </ClearButton>
        )}
      </InputWrapper>

      {/* FILTER-SORT */}
      <OperationsWrapper>
        <ScriptTableOperations />
      </OperationsWrapper>
    </SearchContainer>
  );
}

export default ScriptSearch;
