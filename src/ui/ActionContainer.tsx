import { CiCircleInfo } from "react-icons/ci";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "../context/QueryContext";
import { useUser } from "../features/authentication/useUser";
import type { Variation } from "../ui/Button";
import Button from "./Button";

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

type ActionContainerProps = {
  play: "student" | "tutor" | "requested" | undefined;
  baseType: string;
  showId: string;
  name?: any;
  isTv?: any;
};

function ActionContainer({
  play,
  baseType,
  showId,
  name,
  isTv,
}: ActionContainerProps) {
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

  const NOTICE_READY = intl.formatMessage({
    id: "notice.ready",
    defaultMessage: "스크립트를 등록해보세요.",
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
    navAddress = "",
    noticeText = "",
    buttonVariation: Variation | undefined = "primary",
    disabled;

  switch (play) {
    case "tutor":
      buttonText = TEXT_REGISTER_SCRIPT;
      navAddress = NAV_ADD_SCRIPT;
      noticeText = isTv ? NOTICE_EPISODE_REQUIRED : NOTICE_READY;
      disabled = isTv;
      break;
    case "student":
      buttonText = TEXT_APPLY_TUTOR;
      navAddress = NAV_ACCOUNT;
      noticeText = NOTICE_TUTOR_REQUIRED;
      disabled = false; // 수정
      break;
    case "requested":
      buttonText = TEXT_PENDING;
      navAddress = NAV_ACCOUNT;
      noticeText = NOTICE_TUTOR_REQUIRED;
      buttonVariation = "blue";
      disabled = true; // 수정
      break;
    default:
      buttonText = TEXT_LOGIN;
      navAddress = NAV_LOGIN;
      noticeText = NOTICE_LOGIN_REQUIRED;
      disabled = false; // 수정
      break;
  }

  function handleClick() {
    // NOT LOGGED IN
    if (!user) {
      navigate(NAV_LOGIN);
      return;
    }

    if (play !== "tutor") {
      navigate(NAV_ACCOUNT);
      return;
    }

    // WHEN LOGGED IN
    if (baseType === "tv") {
      navigate(`${NAV_FIND}`);
    } else {
      navigate(navAddress);
    }

    dispatch({
      type: `trend/${baseType}/clicked`,
      payload: { showId, query: name, filter: baseType },
    });
  }

  return (
    <ActionContainerWrapper>
      {/* NOT LOGGED IN */}
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

      {/* LOGGED IN */}
      {user && (
        <StyledButton
          onClick={handleClick}
          disabled={disabled}
          variation={buttonVariation}
        >
          {buttonText}
        </StyledButton>
      )}

      {noticeText && (
        <TutorNotice>
          <CiCircleInfo />
          <span>{noticeText}</span>
        </TutorNotice>
      )}
    </ActionContainerWrapper>
  );
}

export default ActionContainer;
