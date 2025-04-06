import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUpdateUser } from "../features/authentication/useUpdateUser";
import { useUser } from "../features/authentication/useUser";
import Button from "./Button";
import ButtonText from "./ButtonText";
import SpinnerMini from "./SpinnerMini";

// 카드의 외부 컨테이너
export const StyledCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
`;

// 카드 내부 컨텐츠를 위한 컨테이너
export const CardContent = styled.div`
  padding: 1.6rem 3.2rem;

  ul {
    margin: 2rem 0;
    font-size: 1.4rem;
  }

  li {
    margin-bottom: 0.8rem;
    color: var(--color-grey-500);
  }
`;

// 카드 헤더 (선택적으로 사용할 수 있음)
export const CardHeader = styled.div`
  padding: 1.2rem 2rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 카드 푸터 (선택적으로 사용할 수 있음)
export const CardFooter = styled.div`
  padding: 1.2rem 2rem;
  background-color: var(--color-grey-50);
  border-top: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

// 버튼을 오른쪽에 정렬하기 위한 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.6rem;
`;

// 추가 메시지 스타일
const ExtraMessage = styled.p`
  margin-top: 1rem;
  font-size: 1.4rem;
  color: var(--color-brand-600);
  text-align: center;
  font-weight: 500;
`;

function Tutor() {
  const { formatMessage } = useIntl();
  const { updateUser, isUpdating } = useUpdateUser();
  const { user } = useUser();
  const nav = useNavigate();
  const id = user?.id;
  const currentPlay = user?.play;

  // 초기 상태를 "student"로 설정
  const [play, setPlay] = useState();

  useEffect(() => {
    if (currentPlay) {
      setPlay(currentPlay);
    }
  }, [currentPlay]);

  // tutor 요청 처리: student -> tutor 전환 (추후 확장 가능)
  function handleTutorRequest() {
    if (!user) return;

    updateUser(
      { userId: id, play: play === "student" ? "tutor" : "" },
      {
        onSuccess: () => {
          setPlay(play);
        },
      }
    );
  }
  function handleClick() {
    nav("/find");
  }

  const isStudent = play === "student";
  const isTutor = play === "tutor";
  const isRequested = play === "requested";
  const sendApplication = formatMessage({
    id: "tutor.sendApplication",
    defaultMessage: "Send tutor application",
  });

  const sendApplicationConfirmed = formatMessage({
    id: "tutor.sendApplicationConfirmed",
    defaultMessage: "Confirmed",
  });

  const sendApplicationRequested = formatMessage({
    id: "tutor.sendApplicationRequested",
    defaultMessage: "Requested",
  });

  return (
    <StyledCard>
      <CardContent>
        <p>
          {formatMessage({
            id: "tutor.description1",
            defaultMessage: "Ready to take the next step in your journey?",
          })}
        </p>
        <p>
          {formatMessage({
            id: "tutor.description2",
            defaultMessage: "As a tutor, you can:",
          })}
        </p>
        <ul>
          <li>
            ✅{" "}
            {formatMessage({
              id: "tutor.list.create",
              defaultMessage: "Create and share your own script",
            })}
          </li>
          <li>
            ✅{" "}
            {formatMessage({
              id: "tutor.list.earn",
              defaultMessage: "Earn recognition for your expertise",
            })}
          </li>
          <li>
            ✅{" "}
            {formatMessage({
              id: "tutor.list.help",
              defaultMessage: "Help other students with your contents",
            })}
          </li>
          <li>
            ❗️{" "}
            {formatMessage({
              id: "tutor.list.notice",
              defaultMessage: "It",
            })}
          </li>
        </ul>
        {isTutor && (
          <ButtonText active onClick={handleClick}>
            {formatMessage({
              id: "tutor.uploadScriptMessage",
              defaultMessage: "Now go upload your own script ->",
            })}
          </ButtonText>
        )}
        <ButtonContainer>
          <Button
            variation={isStudent ? "primary" : "inactive"}
            size="large"
            onClick={handleTutorRequest}
            disabled={!isStudent}
          >
            {isUpdating ? (
              <SpinnerMini />
            ) : (
              <>
                {isStudent && sendApplication}
                {isTutor && sendApplicationConfirmed}
                {isRequested && sendApplicationRequested}
              </>
            )}
          </Button>
        </ButtonContainer>
      </CardContent>
    </StyledCard>
  );
}

export default Tutor;
