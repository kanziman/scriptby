import styled from "styled-components";

// 🔹 색상 매핑 객체
const textColors = {
  text: {
    title: "var(--color-grey-800)",
    localized: "var(--color-grey-600)",
    year: "var(--color-grey-700)",
    episodeInfo: "var(--color-grey-600)",
    episodeName: "var(--color-grey-500)",
  },
  backdrop: {
    title: "#ddd",
    localized: "#aaa",
    year: "#bbb",
    episodeInfo: "#ddd",
    episodeName: "#ddd",
  },
};

// 🔹 헬퍼 함수
const getTextColor = (
  key: keyof (typeof textColors)["text"],
  backdrop?: boolean
) => (backdrop ? textColors.backdrop[key] : textColors.text[key]);

const ShowInfoWrapper = styled.div`
  display: flex;
  font-family: "Sono", sans-serif;
  flex-direction: column;
`;

const ShowTitle = styled.h1<{ backdropColor?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: ${({ backdropColor }) => getTextColor("title", backdropColor)};

  @media (${(props) => props.theme.media.mobile}) {
    flex-direction: column;
    font-size: 1.8rem;
    margin-bottom: 0.4rem;
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

const LocalizedTitle = styled.span<{ backdropColor?: boolean }>`
  font-size: 1.8rem;
  color: ${({ backdropColor }) => getTextColor("localized", backdropColor)};
  font-weight: 500;
  font-style: italic;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.2rem;
    margin-top: 0.3rem;
  }
`;

const YearLabel = styled.span<{ backdropColor?: boolean }>`
  font-size: 2rem;
  color: ${({ backdropColor }) => getTextColor("year", backdropColor)};
  margin-left: 0.6rem;
  font-weight: normal;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1.2rem;
    margin-left: 0;
    margin-top: 0.2rem;
  }
`;

const EpisodeInfo = styled.div<{ backdropColor?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ backdropColor }) => getTextColor("episodeInfo", backdropColor)};
`;

const EpisodeLabel = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  text-transform: uppercase;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 0.8rem;
  }
`;

const EpisodeName = styled.div<{ backdropColor?: boolean }>`
  font-size: 1.2rem;
  font-style: italic;
  color: ${({ backdropColor }) => getTextColor("episodeName", backdropColor)};

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
