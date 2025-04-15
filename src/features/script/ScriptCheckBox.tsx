import { ChangeEvent, InputHTMLAttributes } from "react";
import styled from "styled-components";
import Checkbox from "../../ui/Checkbox";

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

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

const LabelText = styled.span`
  margin-right: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);

  @media (${(props) => props.theme.media.tablet}) {
    font-size: 1.2rem;
  }
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1rem;
  }
`;

interface ScriptCheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const ScriptCheckBox = ({
  checked,
  onChange,
  label,
  ...props
}: ScriptCheckBoxProps): JSX.Element => (
  <>
    {/* <HiddenCheckbox checked={checked} onChange={onChange} {...props} /> */}
    <Checkbox id={"script-checkbox"} checked={checked} onChange={onChange}>
      {label && <LabelText>{label}</LabelText>}
    </Checkbox>
  </>
);

export default ScriptCheckBox;
