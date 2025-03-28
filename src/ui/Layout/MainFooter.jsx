import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styled from "styled-components";
import { useSettings } from "../../context/SettingsContext";

const Footer = styled.footer`
  padding: 2.8rem 0;
  border-top: 1px solid #eee;
  background-color: var(--color-grey-50);
`;

const GridFooter = styled.div`
  display: grid;
  grid-template-columns: 1.9fr 1.5fr 1fr 1fr 1fr;
  /* 기본 순서대로 5개의 컬럼: LogoCol, Contact, Account, Company, Resources */
  max-width: 120rem;
  padding: 0 2.4rem;
  margin: 0 auto;
  column-gap: 2rem;
  /* row-gap: 3.6rem; */

  @media (max-width: 50em) {
    column-gap: 2.4rem;
    row-gap: 3.6rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto;
    grid-template-areas:
      "account company resources"
      "logo contact contact";
  }
`;

const LogoCol = styled.div`
  display: flex;
  flex-direction: column;
  & svg {
    width: 3.6rem;
    height: 3.6rem;
    transition: all 0.3s;
  }
`;

const FooterLogo = styled.img`
  display: block;
  margin-bottom: 1.2rem;
  height: 6.2rem;
`;

const SocialLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2.4rem;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const Copyright = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-grey-800);
  margin-top: auto;
  flex-flow: wrap;
`;

const FooterHeading = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

// Contact us 컬럼을 위한 styled component
const ContactCol = styled.div`
  @media (max-width: 50em) {
    grid-area: contact;
  }
`;

const Contacts = styled.div`
  font-style: normal;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const Address = styled.p`
  margin-bottom: 2.4rem;
`;

// Account, Company, Resources용 nav styled component들
const NavAccount = styled.nav`
  @media (max-width: 50em) {
    grid-area: account;
  }
`;

const NavCompany = styled.nav`
  @media (max-width: 50em) {
    grid-area: company;
  }
`;

const NavResources = styled.nav`
  @media (max-width: 50em) {
    grid-area: resources;
  }
`;

const FooterNav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.a`
  text-decoration: none;
  font-size: 1.2rem;
  color: var(--text-grey-800);
  transition: all 0.3s;

  &:hover,
  &:active {
    color: #555;
  }
  & svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`;

function MainFooter() {
  const { isDarkMode } = useSettings();

  const src = isDarkMode ? "/logodark.png" : "/logolight.png";
  return (
    <Footer>
      <GridFooter>
        <LogoCol>
          <a href="#">
            <FooterLogo src={src} alt="scriptby logo" />
          </a>
          <SocialLinks>
            <li>
              <FooterLink href="#">
                <FaInstagram />
              </FooterLink>
            </li>
            <li>
              <FooterLink href="#">
                <FaFacebook />
              </FooterLink>
            </li>
            <li>
              <FooterLink href="#">
                <FaTwitter />
              </FooterLink>
            </li>
          </SocialLinks>
          <Copyright>
            Copyright&copy; <span className="year">2025</span> by ScriptBy, Inc.
            All rights reserved.
          </Copyright>
        </LogoCol>

        <ContactCol>
          <FooterHeading>Contact us</FooterHeading>
          <Contacts>
            <Address>
              135, Misagangbyeonhangang-ro, Hanam-si,
              <br /> Gyeonggi-do, Republic of Korea
            </Address>
            <p>
              <FooterLink href="mailto:scriptby99@gmail.com">
                scriptby99@gmail.com
              </FooterLink>
            </p>
          </Contacts>
        </ContactCol>

        <NavAccount>
          <FooterHeading>Account</FooterHeading>
          <FooterNav>
            <li>
              <FooterLink href="/signup">Create account</FooterLink>
            </li>
            <li>
              <FooterLink href="/login">Sign in</FooterLink>
            </li>
          </FooterNav>
        </NavAccount>

        <NavCompany>
          <FooterHeading>Company</FooterHeading>
          <FooterNav>
            <li>
              <FooterLink href="#">About ScriptBy</FooterLink>
            </li>
            <li>
              <FooterLink href="#">For Business</FooterLink>
            </li>
          </FooterNav>
        </NavCompany>

        <NavResources>
          <FooterHeading>Resources</FooterHeading>
          <FooterNav>
            <li>
              <FooterLink href="#">Help center</FooterLink>
            </li>
            <li>
              <FooterLink href="#">Privacy & terms</FooterLink>
            </li>
          </FooterNav>
        </NavResources>
      </GridFooter>
    </Footer>
  );
}

export default MainFooter;
