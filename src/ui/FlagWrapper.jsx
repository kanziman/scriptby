import styled from "styled-components";

const FlagWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary, #f0f0f0); /* 원하는 색상으로 변경 */
  border-radius: 50%;
  width: 2.4rem;
  height: 2.4rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-100);
  margin-right: -1.5rem; /* 겹치는 효과 */
`;

export default function Flags({ code }) {
  return (
    <FlagWrapper role="img" aria-label={code}>
      {code}
    </FlagWrapper>
  );
}
