import styled from "styled-components";

// 전체 컨테이너: label로 감싸면 클릭 시 자동으로 연결된 input이 변경됩니다.
const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

// 실제 체크박스는 화면에서 숨깁니다.
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
`;

// 커스텀 체크박스 스타일
const StyledCheckbox = styled.div`
  width: 20px;
  height: 20px;
  background: ${(props) =>
    props.checked ? "var(--color-brand-500)" : "white"};
  border: 2px solid
    ${(props) => (props.checked ? "var(--color-brand-500)" : "#ccc")};
  border-radius: 4px;
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;

  ${CheckboxContainer}:hover & {
    border-color: var(--color-brand-200);
  }
`;

// 체크 표시 아이콘 (SVG)
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

// 라벨 텍스트 스타일
const LabelText = styled.span`
  margin-right: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);

  @media (max-width: 50em) {
    font-size: 1.2rem;
  }
  @media (max-width: 34em) {
    font-size: 1rem;
  }
`;

const ScriptCheckBox = ({ checked, onChange, label, ...props }) => (
  <CheckboxContainer>
    {label && <LabelText>{label}</LabelText>}
    <HiddenCheckbox checked={checked} onChange={onChange} {...props} />
    <StyledCheckbox checked={checked}>
      {checked && (
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      )}
    </StyledCheckbox>
  </CheckboxContainer>
);

export default ScriptCheckBox;
