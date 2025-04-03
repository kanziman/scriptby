import React from "react";
import { CiCircleInfo } from "react-icons/ci";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "../context/QueryContext";
import { useUser } from "../features/authentication/useUser";
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
  font-size: 1rem;
  color: var(--color-grey-400);
  background-color: var(--color-grey-200);
  padding: 0.8rem 1rem;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px var(--color-grey-300);
  @media (max-width: 60em) {
    span {
      font-size: 0.8rem;
      padding: 0;
    }
  }
`;

// 네비게이션 주소 및 텍스트 등의 상수 (번역되지 않는 값)
const NAV_ADD_SCRIPT = "/script/add";
const NAV_FIND = "/find";
const NAV_ACCOUNT = "/account";
const NAV_LOGIN = "/login";

function ActionContainer({ play, baseType, showId, name, isTv }) {
  const navigate = useNavigate();
  const { dispatch } = useQuery();
  const intl = useIntl();
  const { user } = useUser();

  // intl을 이용해 텍스트 상수를 생성합니다.
  const TEXT_REGISTER_SCRIPT = intl.formatMessage({
    id: "action.registerScript",
  });
  const TEXT_APPLY_TUTOR = intl.formatMessage({
    id: "action.applyTutor",
  });
  const TEXT_PENDING = intl.formatMessage({
    id: "action.pending",
  });
  const TEXT_LOGIN = intl.formatMessage({
    id: "action.login",
  });

  const NOTICE_EPISODE_REQUIRED = intl.formatMessage({
    id: "notice.episodeRequired",
    defaultMessage: "스크립트를 등록하려면, Episode를 선택해야 합니다.",
  });
  const NOTICE_TUTOR_REQUIRED = intl.formatMessage({
    id: "notice.tutorRequired",
    defaultMessage: "스크립트를 등록하려면, tutor로 신청해야 합니다.",
  });
  const NOTICE_LOGIN_REQUIRED = intl.formatMessage({
    id: "notice.loginRequired",
    defaultMessage: "스크립트를 등록하려면, 로그인 해야 합니다.",
  });

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
      disabled = play !== "tutor";
      break;
    case "student":
      buttonText = TEXT_APPLY_TUTOR;
      navAddress = NAV_ACCOUNT;
      noticeText = NOTICE_TUTOR_REQUIRED;
      disabled = play === "tutor";
      break;
    case "requested":
      buttonText = TEXT_PENDING;
      navAddress = NAV_ACCOUNT;
      noticeText = NOTICE_TUTOR_REQUIRED;
      buttonVariation = "blue";
      disabled = play !== "tutor";
      break;
    default:
      buttonText = TEXT_LOGIN;
      navAddress = NAV_LOGIN;
      noticeText = NOTICE_LOGIN_REQUIRED;
      disabled = play === "tutor";
      break;
  }

  function handleClick() {
    if (baseType === "tv") {
      // tv
      dispatch({
        type: `trend/${baseType}/clicked`,
        payload: { showId, query: name, filter: baseType },
      });
      navigate(`${NAV_FIND}`);
    } else {
      // movie
      dispatch({
        type: `trend/${baseType}/clicked`,
        payload: { showId, query: name, filter: baseType },
      });
      navigate(navAddress);
    }
  }

  console.log("user :>> ", user);

  return (
    <ActionContainerWrapper>
      {!user && (
        <StyledButton
          onClick={handleClick}
          disabled={disabled}
          variation={buttonVariation}
        >
          {intl.formatMessage({
            id: "action.login",
          })}
        </StyledButton>
      )}
      {user && !isTv && (
        <StyledButton
          onClick={handleClick}
          disabled={disabled}
          variation={buttonVariation}
        >
          {buttonText}
        </StyledButton>
      )}

      {noticeText && (play !== "tutor" || isTv) && (
        <TutorNotice>
          <CiCircleInfo />
          <span>{noticeText}</span>
        </TutorNotice>
      )}

      {/* When Not a tutor */}
      {/* {play !== "tutor" && noticeText && (
        <TutorNotice>
          <CiCircleInfo />
          <span>{noticeText}</span>
        </TutorNotice>
      )} */}

      {/* When Tv Shows */}
      {/* {isTv && noticeText && (
        <TutorNotice>
          <CiCircleInfo />
          <span>{noticeText}</span>
        </TutorNotice>
      )} */}
    </ActionContainerWrapper>
  );
}

export default ActionContainer;
