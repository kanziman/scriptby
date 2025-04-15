import { MouseEvent } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface ConfirmDeleteProps {
  resource: string;
  onConfirm: () => void;
  onCloseModal: () => void;
  disabled?: boolean;
}

function ConfirmDelete({
  resource,
  onConfirm,
  onCloseModal,
  disabled = false,
}: ConfirmDeleteProps): JSX.Element {
  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseModal();
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onConfirm();
    onCloseModal();
  };

  return (
    <StyledConfirmDelete>
      <Heading as="h1">
        <FormattedMessage
          id="modal.delete.title"
          defaultMessage="Delete {resource}"
          values={{ resource }}
        />
      </Heading>
      <p>
        <FormattedMessage
          id="modal.delete.description"
          defaultMessage="Are you sure you want to delete this {resource} permanently? This action cannot be undone."
          values={{ resource }}
        />
      </p>

      <div>
        <Button
          variation="secondary"
          onClick={handleCancel}
          disabled={disabled}
        >
          <FormattedMessage id="modal.delete.cancel" defaultMessage="Cancel" />
        </Button>
        <Button variation="danger" onClick={handleDelete} disabled={disabled}>
          <FormattedMessage id="modal.delete.delete" defaultMessage="Delete" />
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
