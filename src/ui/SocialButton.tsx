import { useIntl } from "react-intl";
import styled from "styled-components";

// Styled Component 정의
const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledHR = styled.hr`
  flex: 1;
`;

const DividerText = styled.span`
  margin: 0 0.8rem;
  white-space: nowrap;
  font-size: 0.9rem;
  color: var(--color-grey-500);
`;

// 기존 코드에서 사용 예시
function SocialButton() {
  const { formatMessage } = useIntl();

  return (
    <DividerContainer>
      <StyledHR />
      <DividerText>
        {formatMessage({
          id: "login.socialLogin",
          defaultMessage: "Or with social accounts",
        })}
      </DividerText>
      <StyledHR />
    </DividerContainer>
  );
}

export default SocialButton;
