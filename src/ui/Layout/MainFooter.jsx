import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useSettings } from "../../context/SettingsContext";

const Footer = styled.footer`
  padding: 2.8rem 0;
  border-top: 1px solid #eee;
  background-color: var(--color-grey-50);
  max-width: 100%;
  color: var(--color-grey-500);
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
  color: var(--color-grey-600);
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
  color: var(--color-grey-600);
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
  const { darkMode } = useSettings();

  const src = darkMode ? "/logodark.png" : "/logolight.png";
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
          <FooterHeading>
            <FormattedMessage
              id="footer.contactUs"
              defaultMessage="Contact us"
            />
          </FooterHeading>
          <Contacts>
            <Address>
              <FormattedMessage
                id="footer.address"
                defaultMessage="135, Misagangbyeonhangang-ro, Hanam-si, {br}Gyeonggi-do, Republic of Korea"
                values={{ br: <br /> }}
              />
            </Address>
            <p>
              <FooterLink href="mailto:scriptby99@gmail.com">
                scriptby99@gmail.com
              </FooterLink>
            </p>
          </Contacts>
        </ContactCol>

        <NavAccount>
          <FooterHeading>
            <FormattedMessage id="footer.account" defaultMessage="Account" />
          </FooterHeading>
          <FooterNav>
            <li>
              <FooterLink href="/signup">
                <FormattedMessage
                  id="footer.createAccount"
                  defaultMessage="Create account"
                />
              </FooterLink>
            </li>
            <li>
              <FooterLink href="/login">
                <FormattedMessage id="footer.signIn" defaultMessage="Sign in" />
              </FooterLink>
            </li>
          </FooterNav>
        </NavAccount>

        <NavCompany>
          <FooterHeading>
            <FormattedMessage id="footer.company" defaultMessage="Company" />
          </FooterHeading>
          <FooterNav>
            <li>
              <FooterLink href="#">
                <FormattedMessage
                  id="footer.aboutScriptBy"
                  defaultMessage="About ScriptBy"
                />
              </FooterLink>
            </li>
            <li>
              <FooterLink href="#">
                <FormattedMessage
                  id="footer.forBusiness"
                  defaultMessage="For Business"
                />
              </FooterLink>
            </li>
          </FooterNav>
        </NavCompany>

        <NavResources>
          <FooterHeading>
            <FormattedMessage
              id="footer.resources"
              defaultMessage="Resources"
            />
          </FooterHeading>
          <FooterNav>
            <li>
              <FooterLink href="#">
                <FormattedMessage
                  id="footer.helpCenter"
                  defaultMessage="Help center"
                />
              </FooterLink>
            </li>
            <li>
              <FooterLink href="#">
                <FormattedMessage
                  id="footer.privacyTerms"
                  defaultMessage="Privacy & terms"
                />
              </FooterLink>
            </li>
          </FooterNav>
        </NavResources>
      </GridFooter>
    </Footer>
  );
}

export default MainFooter;
