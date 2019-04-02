import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BannerWrap = styled.aside`
  display: block;
  margin: 0px auto 0px auto;
  width: 700px;
  height: 90px;
  color: #fff;
  font-size: 28px;
  cursor: pointer;

  :hovercursor: pointer;
`;

const BannerMobile = styled.aside`
  width: 95vw;
  max-width: 400px;
  height: 70px;
  font-size: 18px;
  margin: 70px auto;
  border-radius: 50px;
`;

const BannerHeader = styled.p`
  font-family: "Gotham Thin";
  margin-left: 160px;
  padding-top: 10px;
  font-weight: bold;
  line-height: 1.25;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-left: 105px;
  }
`;

const BannerHeaderStrong = styled.strong`
  font-family: "Gotham Bold";
  margin-top: 0;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
`;

const Banner = ({ home }) => (
  <div style={{ paddingBottom: "70px" }}>
    <BannerWrap
      onClick={() => (window.location.href = `/packages/`)}
      className="is-rounded is-hidden-mobile"
      style={{
        backgroundImage: `url(${
          !!home.featuredBanner.image.childImageSharp
            ? home.featuredBanner.image.childImageSharp.fluid.src
            : home.featuredBanner.image
        })`
      }}
    >
      <BannerHeader>
        {home.featuredBanner.heading1}
        <br />
        <BannerHeaderStrong>{home.featuredBanner.heading2}</BannerHeaderStrong>
      </BannerHeader>
    </BannerWrap>

    <BannerMobile
      onClick={() => (window.location.href = `/packages/`)}
      className="is-rounded is-hidden-tablet"
      style={{
        backgroundImage: `url(${
          !!home.featuredBanner.mobileImage.childImageSharp
            ? home.featuredBanner.mobileImage.childImageSharp.fluid.src
            : home.featuredBanner.mobileImage
        })`
      }}
    >
      <BannerHeader>
        {home.featuredBanner.heading1}
        <br />
        <BannerHeaderStrong>{home.featuredBanner.heading2}</BannerHeaderStrong>
      </BannerHeader>
    </BannerMobile>
  </div>
);

Banner.propTypes = {
  home: PropTypes.object.isRequired
};

export default Banner;
