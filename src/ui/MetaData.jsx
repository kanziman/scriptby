import { format, isToday } from "date-fns";
import { HiMiniEye } from "react-icons/hi2";
import styled from "styled-components";
import { formatDistanceFromNow } from "../utils/helpers";

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  font-weight: 300;
  color: var(--color-grey-400);
  font-size: 1.2rem;
  gap: 0.4rem;
  h3 {
    font-weight: 500;
  }
`;

function MetaData({ username, createdAt, view }) {
  return (
    <>
      <MetaItem>
        <h3>{username}</h3>
        <span>&bull;</span>
        <time dateTime={createdAt}>
          {isToday(new Date(createdAt))
            ? formatDistanceFromNow(createdAt)?.replace("mInutes", "min")
            : format(new Date(createdAt), "EEE, MMM dd yyyy")}
        </time>
        &bull;
        <HiMiniEye />
        {view}
      </MetaItem>
    </>
  );
}

export default MetaData;
