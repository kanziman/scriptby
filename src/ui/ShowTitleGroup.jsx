import styled from "styled-components";

// 메타 정보를 감싸는 컨테이너
const ShowInfoWrapper = styled.div`
  display: flex;
  font-family: "Sono", sans-serif;
  flex-direction: column;
  /* align-items: center; */
`;

// 메인 타이틀 스타일
const ShowTitle = styled.h1`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.backdropColor ? `#ddd` : "var(--color-grey-800)")};

  @media (${(props) => props.theme.media.mobile}) {
    flex-direction: column;
    font-size: 1.8rem;
    margin-bottom: 0.4rem;
    /* align-items: flex-start; */
  }
`;

const OriginalTitle = styled.span`
  font-size: 2.8rem;
  text-transform: uppercase;
  margin-right: 0.8rem;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.6rem;
  }
`;

const LocalizedTitle = styled.span`
  font-size: 1.8rem;
  color: ${(props) => (props.backdropColor ? `#aaa` : "var(--color-grey-600)")};
  font-weight: 500;
  font-style: italic;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.2rem;
    margin-top: 0.3rem;
  }
`;

const YearLabel = styled.span`
  font-size: 2rem;
  color: ${(props) => (props.backdropColor ? `#bbb` : "var(--color-grey-700)")};
  margin-left: 0.6rem;
  font-weight: normal;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.2rem;
    margin-left: 0;
    margin-top: 0.2rem;
  }
`;

// 에피소드 정보를 담는 행
const EpisodeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-grey-600);
  color: ${(props) => props.backdropColor && `#ddd`};
`;

// 시즌과 에피소드 번호에 적용할 스타일
const EpisodeLabel = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  text-transform: uppercase;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 0.8rem;
  }
`;

// 에피소드 제목 스타일 (짧게 줄인 제목)
const EpisodeName = styled.div`
  font-size: 1.2rem;
  font-style: italic;
  color: var(--color-grey-500);
  color: ${(props) => props.backdropColor && `#ddd`};
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 0.8rem;
  }
`;

const Delimiter = styled.span`
  color: var(--color-grey-400);
  @media (${(props) => props.theme.media.mobile}) {
    font-size: 0.8rem;
  }
`;

export {
  Delimiter,
  EpisodeInfo,
  EpisodeLabel,
  EpisodeName,
  LocalizedTitle,
  OriginalTitle,
  ShowInfoWrapper,
  ShowTitle,
  YearLabel,
};
