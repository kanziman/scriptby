import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-right: 1.4rem;
  cursor: pointer;
  @media (max-width: 34em) {
    margin-right: 0;
    & img {
      width: 2.4rem;
    }
  }
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar({ isBrowserSmall }) {
  const { user, isPending } = useUser();
  const navigate = useNavigate();

  const fullName = user?.username || "";
  const avatar = user?.avatar_url || "/default-user.jpg";
  if (isPending) return <SpinnerMini />;

  const handleClick = () => {
    navigate("/account");
  };

  return (
    user && (
      <StyledUserAvatar onClick={handleClick}>
        <Avatar src={avatar} alt={`Avatar of ${fullName}`} />
        {!isBrowserSmall && <span>{fullName}</span>}
      </StyledUserAvatar>
    )
  );
}

export default UserAvatar;
