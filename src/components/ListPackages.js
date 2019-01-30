import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import PropTypes from "prop-types";

const PackageWrap = styled.section`
  //   background-color: #f6f9f2;
  padding: 50px 0 50px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PackageGraphic = styled.div`
  width: 25em;
  padding: .5em;
  img {
    padding: 1em;
    background-color: #e4ecd9;
    border-radius: 100%;
    height: 5em;
    width: 5em;
  }
  @media (min-width: 768px) {
    max-width: 258px;
    margin: auto 45px;
  }

  @media (max-width: 768px) {
    max-width: 200px;
    margin: auto;
  }
`;

const PackageHeading = styled.p`
  height: 41px;
  font-size: 1.2em;
  font-weight: 800;
  text-transform: uppercase;
`;

const PackageBody = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
  margin-bottom: 2.5em;
  @media (min-width: 768px) {
    // width: 280px;
    height: 80px;
  }
`;

const ListPackages = ({ data }) => (
  <PackageWrap>
    <PackageGraphic>
      <img src={data.package1.image.publicURL} alt="Tailor Made" />
      <PackageHeading>{data.package1.heading}</PackageHeading>
      <PackageBody>{data.package1.description}</PackageBody>
      <a className="button is-success is-rounded">SAMPLE PACKAGE</a>
    </PackageGraphic>

    <PackageGraphic>
      <img src={data.package2.image.publicURL} alt="Tailor Made" />
      <PackageHeading>{data.package2.heading}</PackageHeading>
      <PackageBody>{data.package2.description}</PackageBody>
      <a className="button is-success is-rounded">SAMPLE PACKAGE</a>
    </PackageGraphic>

    <PackageGraphic>
      <img src={data.package3.image.publicURL} alt="Tailor Made" />
      <PackageHeading>{data.package3.heading}</PackageHeading>
      <PackageBody>{data.package3.description}</PackageBody>
      <a className="button is-success is-rounded">SAMPLE PACKAGE</a>
    </PackageGraphic>

    <PackageGraphic>
      <img src={data.package4.image.publicURL} alt="Tailor Made" />
      <PackageHeading>{data.package4.heading}</PackageHeading>
      <PackageBody>{data.package4.description}</PackageBody>
      <a className="button is-success is-rounded">SAMPLE PACKAGE</a>
    </PackageGraphic>
    <PackageGraphic>
      <img src={data.package5.image.publicURL} alt="Tailor Made" />
      <PackageHeading>{data.package5.heading}</PackageHeading>
      <PackageBody>{data.package5.description}</PackageBody>
      <a className="button is-success is-rounded">SAMPLE PACKAGE</a>
    </PackageGraphic>
    <PackageGraphic>
      <img src={data.package6.image.publicURL} alt="Tailor Made" />
      <PackageHeading>{data.package6.heading}</PackageHeading>
      <PackageBody>{data.package6.description}</PackageBody>
      <a className="button is-success is-rounded">SAMPLE PACKAGE</a>
    </PackageGraphic>
    <PackageGraphic>
      <img src={data.package7.image.publicURL} alt="Tailor Made" />
      <PackageHeading>{data.package7.heading}</PackageHeading>
      <PackageBody>{data.package7.description}</PackageBody>
      <a className="button is-success is-rounded">SAMPLE PACKAGE</a>
    </PackageGraphic>
  </PackageWrap>
);

export default ListPackages;

ListPackages.propTypes = {
  data: PropTypes.object.isRequired
};
