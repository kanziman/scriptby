import { motion } from "framer-motion";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BannerContainer = styled.div`
  width: 100%;
  background: linear-gradient(
    to right,
    var(--color-brand-50),
    var(--color-brand-100)
  );
  padding: 1.5rem 0;
  margin-top: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      to right,
      var(--color-brand-500),
      var(--color-brand-700)
    );
  }
`;

const ContentWrapper = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* z-index: 1; */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const BannerText = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #374151;
  margin-right: 2rem;

  @media (max-width: 768px) {
    margin-right: 0;
    text-align: center;
  }
`;

const ApplyButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: var(--color-brand-600);
  color: white;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border-radius: 3rem;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--color-brand-700);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: "→";
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }

  &:hover::after {
    transform: translateX(3px);
  }
`;

const Highlight = styled.span`
  color: var(--color-brand-700);
  font-weight: 600;
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  top: -10rem;
  right: -5rem;
  z-index: 0;
`;

const ApplyTutorBanner = () => {
  return (
    <BannerContainer>
      <BackgroundDecoration />
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BannerText>
            <FormattedMessage
              id="banner.message"
              values={{
                highlight: (
                  <Highlight>
                    <FormattedMessage
                      id="banner.createYourOwnScript"
                      defaultMessage="create your own script"
                    />
                  </Highlight>
                ),
              }}
            />
          </BannerText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <ApplyButton to="/account">
            {" "}
            <FormattedMessage id="banner.applyButton" />
          </ApplyButton>
        </motion.div>
      </ContentWrapper>
    </BannerContainer>
  );
};

export default ApplyTutorBanner;
