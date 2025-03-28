import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "../context/QueryContext";
import Button from "../ui/Button";

// Styled components
const ActionContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 1rem;
`;

const TutorNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: var(--color-grey-700);
  background-color: var(--color-grey-200);
  padding: 0.8rem 1rem;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px var(--color-grey-300);
`;

// 네비게이션 주소 및 텍스트 등의 상수
const NAV_ADD_SCRIPT = "/script/add";
const NAV_FIND = "/find";
const NAV_ACCOUNT = "/account";
const NAV_LOGIN = "/login";

const TEXT_REGISTER_SCRIPT = "스크립트 등록";
const TEXT_APPLY_TUTOR = "튜터 신청하기";
const TEXT_PENDING = "승인 대기중";
const TEXT_LOGIN = "로그인";

const NOTICE_EPISODE_REQUIRED =
  "스크립트를 등록하려면, Episode를 선택해야 합니다.";
const NOTICE_TUTOR_REQUIRED = "스크립트를 등록하려면, tutor로 신청해야 합니다.";
const NOTICE_LOGIN_REQUIRED = "스크립트를 등록하려면, 로그인 해야 합니다.";

function ActionContainer({ play, baseType, showId, name, isTv }) {
  const navigate = useNavigate();
  const isTutor = play === "tutor";
  const { dispatch } = useQuery();

  // useEffect(() => {
  //   if (name && baseType) {
  //     setQuery(name);
  //     setSearchParams({ filter: baseType });
  //   }
  // }, [name, setQuery, baseType, setSearchParams]);

  let buttonText,
    navAddress,
    noticeText = "",
    buttonVariation = undefined,
    disabled;

  switch (play) {
    case "tutor":
      buttonText = TEXT_REGISTER_SCRIPT;
      navAddress = NAV_ADD_SCRIPT;
      noticeText = NOTICE_EPISODE_REQUIRED;
      disabled = !isTutor;
      break;
    case "student":
      buttonText = TEXT_APPLY_TUTOR;
      navAddress = NAV_ACCOUNT;
      noticeText = NOTICE_TUTOR_REQUIRED;
      disabled = isTutor;
      break;
    case "requested":
      buttonText = TEXT_PENDING;
      navAddress = NAV_ACCOUNT;
      noticeText = NOTICE_TUTOR_REQUIRED;
      buttonVariation = "blue";
      disabled = !isTutor;
      break;
    default:
      buttonText = TEXT_LOGIN;
      navAddress = NAV_LOGIN;
      noticeText = NOTICE_LOGIN_REQUIRED;
      disabled = isTutor;
      break;
  }
  function handleClick() {
    if (baseType === "tv") {
      /// tv
      dispatch({
        type: `trend/${baseType}/clicked`,
        payload: { showId, query: name, filter: baseType },
      });
      navigate(`${NAV_FIND}`);
    } else {
      /// movie
      dispatch({
        type: `trend/${baseType}/clicked`,
        payload: { showId, query: name, filter: baseType },
      });
      navigate(navAddress);
    }
  }

  return (
    <ActionContainerWrapper>
      {!isTv && (
        <StyledButton
          onClick={handleClick}
          disabled={disabled}
          variation={buttonVariation}
        >
          {buttonText}
        </StyledButton>
      )}

      {/* When Not a tutor */}
      {play !== "tutor" && noticeText && (
        <TutorNotice>
          <CiCircleInfo />
          <span>{noticeText}</span>
        </TutorNotice>
      )}

      {/* When Tv Shows */}
      {isTv && noticeText && (
        <TutorNotice>
          <CiCircleInfo />
          <span>{noticeText}</span>
        </TutorNotice>
      )}
    </ActionContainerWrapper>
  );
}

export default ActionContainer;
