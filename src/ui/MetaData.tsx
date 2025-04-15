import { format, isToday } from "date-fns";
import { ReactNode } from "react";
import { HiMiniClock, HiMiniEye, HiMiniUser } from "react-icons/hi2";
import styled from "styled-components";
import { formatDistanceFromNow } from "../utils/helpers";

const MetadataContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  font-size: 1.1rem;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 0.95rem;
    gap: 0.4rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-grey-600);

  svg {
    color: var(--color-grey-500);
    font-size: 1.2em;
  }

  @media (${(props) => props.theme.media.mobile}) {
    gap: 0.3rem;
  }
`;

const Username = styled.span`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const Divider = styled.span`
  color: var(--color-grey-400);
  margin: 0 0.2rem;
`;

const ViewCount = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  svg {
    color: var(--color-grey-500);
  }
`;

const DateTime = styled.time`
  color: var(--color-grey-500);
`;

interface MetaDataProps {
  username: string;
  createdAt: string | Date;
  view?: number;
  children?: ReactNode;
}

function MetaData({
  username,
  createdAt,
  view,
  children,
}: MetaDataProps): JSX.Element {
  if (!createdAt) return <Divider>&bull;</Divider>;

  const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;

  return (
    <MetadataContainer>
      <MetaItem>
        {children ?? <HiMiniUser />}
        <Username>{username}</Username>
      </MetaItem>

      <Divider>&bull;</Divider>

      <MetaItem>
        <HiMiniClock />
        <DateTime dateTime={date.toISOString()}>
          {isToday(date)
            ? formatDistanceFromNow(date)
            : format(date, "yyyy.MM.dd")}
        </DateTime>
      </MetaItem>

      {view !== undefined && (
        <>
          <Divider>&bull;</Divider>
          <MetaItem>
            <ViewCount>
              <HiMiniEye />
              {view.toLocaleString()}
            </ViewCount>
          </MetaItem>
        </>
      )}
    </MetadataContainer>
  );
}

export default MetaData;
