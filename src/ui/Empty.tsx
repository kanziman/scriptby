import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const StyledEmpty = styled.div`
  margin-left: 1rem;
  color: var(--color-grey-500);
`;

interface EmptyProps {
  resource: string;
}

function Empty({ resource }: EmptyProps): JSX.Element {
  return (
    <StyledEmpty>
      <FormattedMessage
        id="emptyMessage"
        defaultMessage="No {resource} could be found."
        values={{ resource }}
      />
    </StyledEmpty>
  );
}

export default Empty;
