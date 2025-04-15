import styled from "styled-components";

// ✅ Backdrop 컴포넌트의 props 타입 지정
interface BackdropProps {
  image: string;
}

const StyledScriptAddForm = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
`;

const Backdrop =
  styled.div <
  BackdropProps >
  `
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.header`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-brand-500);

  @media (${(props) => props.theme.media.mobile}) {
    h1 {
      gap: 0;
      margin: 0;
      flex-direction: row;
    }
  }
`;

const OverView = styled.div`
  color: #d1d5db;
  font-style: italic;
  font-size: 1.2rem;
  padding: 1rem;

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 2.4rem;
  gap: 1.6rem;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background-color: var(--color-grey-50);
`;

const Footer = styled.footer`
  padding: 1.8rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-600);
  text-align: right;
  border-top: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-50);
  position: relative;

  p {
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  @media (${(props) => props.theme.media.mobile}) {
    font-size: 0.8rem;
  }
`;

export {
  Backdrop,
  ContentWrapper,
  Footer,
  Header,
  OverView,
  Section,
  StyledScriptAddForm,
};
