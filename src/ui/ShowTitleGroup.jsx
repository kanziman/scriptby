import styled from "styled-components";

// 메타 정보를 감싸는 컨테이너
const ShowInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 메인 타이틀 스타일
const ShowTitle = styled.h1`
  text-transform: uppercase;
  font-family: "Sono", sans-serif;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2.8rem;
  color: ${(props) => props.backdropColor && `#ddd`};
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
`;

// 에피소드 제목 스타일 (짧게 줄인 제목)
const EpisodeName = styled.div`
  font-size: 1.2rem;
  font-style: italic;
  color: var(--color-grey-500);
  color: ${(props) => props.backdropColor && `#ddd`};
`;

export { EpisodeInfo, EpisodeLabel, EpisodeName, ShowInfoWrapper, ShowTitle };
