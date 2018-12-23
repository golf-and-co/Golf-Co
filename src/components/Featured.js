import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'
import Select from '../utilities/Select'

const FeaturedWrap = styled.section`
  background-color: #cfddbb;
  display:block;
  justify-content: center;
  border-radius: 200%/195px 195px 0 0;
  margin-top:-60px;
`;

const FeaturedHeading = styled.h3`
  color: #1d8649;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 300;
  text-align:center;
  padding: 50px 0 50px 0;
`;
const FeaturedHeadingTag = styled.strong`
  font-weight: bold;
  font-family: "Gotham Bold";
`;

const FeaturedCard = styled.div`
  width: 260px;
  height: 320px;
  margin: 0 auto;
  border-radius: 6px;
  background-color: #ffffff;
`;

const FeaturedCardImageWrap = styled.div`
  height:216px;
`;

const FeaturedCardImage = styled.img`
  height:216px !important;
`;

const FeaturedCardContent = styled.div`
  color: #000000;
  font-size: 20px;
  font-weight: 300;
  margin: 16px auto auto 16px;
  padding:0;
`;

const FeaturedCardContentTag = styled.div`
  color: #9b9b9b;
  font-size: 14px;
  margin-top: 9px;
`;

const FeaturedCardCaption = styled.div`
  width: 80px;
  height: 20px;
  border-radius: 8px;
  background-color: #1d8649;
  color: #ffffff;
  font-family: "Gotham Book";
  font-size: .7rem;
  font-weight: 300;
  text-transform: uppercase;
  position: relative;
  z-index: 10;
  top: -185px;
  left: 10px;
  line-height: 1.1rem;
  letter-spacing: .1px;
  text-align:center;
}`;

const FeaturedButton = styled.button`
    display: block;
    margin: 50px auto 0px auto;
    background:none;
    color: #1d8649;
    font-weight: 300;
    text-transform: uppercase;
    border-color: #1d8649;
`;

const FeaturedBanner = styled.aside`
    display: block;
    margin: 70px auto 70px auto;
    width: 700px;
    height: 90px;
    color: #FFF;
    font-size: 28px;

    :hover
        cursor:pointer;
`;

const FeaturedBannerHeader = styled.p`
    font-family: "Gotham Thin";
    margin-left: 240px;
    padding-top: 10px;
    font-weight: bold;
    line-height:1.25;
`;

const FeaturedBannerHeaderStrong = styled.strong`
    font-family: "Gotham Bold";
    margin-top:0;
    font-weight:700;
    color:#FFF;
    text-transform:uppercase;
`;

const FeaturedFooter = styled.footer`
    display: block;
    margin: 0 auto;
    color: #1d8649;
    font-family: "Gotham Light";
    font-size: 30px;
    font-weight: 300;
    text-transform: uppercase;
    text-align: center;
    line-height: 1.25;
    padding-bottom: 20px;
`;

const FeaturedFooterStrong = styled.footer`
    font-family: "Gotham Black";
    font-weight: 900;
`;

const FeaturedLogos = styled.section`
    background-color: #aec3b2;
    display:flex;
    justify-content: center;
    padding: 75px 0;
`;

const Featured = ({data}) => <FeaturedWrap>
    <FeaturedHeading className="title">
    {data.featured.heading1}
    <br />
    <FeaturedHeadingTag>{data.featured.heading2}</FeaturedHeadingTag>
    <br />
    <Select options={[{value:"UAE"}]} />
    </FeaturedHeading>
    
    <div className="columns">
        <FeaturedCard className="card is-quarter">
            <FeaturedCardImageWrap className="card-image">
            <figure className="image is-4by3">
                <FeaturedCardImage src={
                !!data.course1.image.childImageSharp
                    ? data.course1.image.childImageSharp.fluid.src
                    : data.course1.image
                } alt="Placeholder" />
            </figure>
            <FeaturedCardCaption>Abu Dhabi</FeaturedCardCaption>
            </FeaturedCardImageWrap>
            <FeaturedCardContent className="card-content">
            <div className="content">
                {data.course1.heading}
                <br />
                <FeaturedCardContentTag>{data.course1.description}</FeaturedCardContentTag>
            </div>
            </FeaturedCardContent>
        </FeaturedCard>

        <FeaturedCard className="card is-quarter">
            <FeaturedCardImageWrap className="card-image">
            <figure className="image is-4by3">
                <FeaturedCardImage src={
                !!data.course1.image.childImageSharp
                    ? data.course1.image.childImageSharp.fluid.src
                    : data.course1.image
                } alt="Placeholder" />
            </figure>
            <FeaturedCardCaption>Abu Dhabi</FeaturedCardCaption>
            </FeaturedCardImageWrap>
            <FeaturedCardContent className="card-content">
            <div className="content">
                {data.course1.heading}
                <br />
                <FeaturedCardContentTag>{data.course1.description}</FeaturedCardContentTag>
            </div>
            </FeaturedCardContent>
        </FeaturedCard>

        <FeaturedCard className="card is-quarter">
            <FeaturedCardImageWrap className="card-image">
            <figure className="image is-4by3">
                <FeaturedCardImage src={
                !!data.course1.image.childImageSharp
                    ? data.course1.image.childImageSharp.fluid.src
                    : data.course1.image
                } alt="Placeholder" />
            </figure>
            <FeaturedCardCaption>Abu Dhabi</FeaturedCardCaption>
            </FeaturedCardImageWrap>
            <FeaturedCardContent className="card-content">
            <div className="content">
                {data.course1.heading}
                <br />
                <FeaturedCardContentTag>{data.course1.description}</FeaturedCardContentTag>
            </div>
            </FeaturedCardContent>
        </FeaturedCard>

        <FeaturedCard className="card is-quarter">
            <FeaturedCardImageWrap className="card-image">
            <figure className="image is-4by3">
                <FeaturedCardImage src={
                !!data.course1.image.childImageSharp
                    ? data.course1.image.childImageSharp.fluid.src
                    : data.course1.image
                } alt="Placeholder" />
            </figure>
            <FeaturedCardCaption>Abu Dhabi</FeaturedCardCaption>
            </FeaturedCardImageWrap>
            <FeaturedCardContent className="card-content">
            <div className="content">
                {data.course1.heading}
                <br />
                <FeaturedCardContentTag>{data.course1.description}</FeaturedCardContentTag>
            </div>
            </FeaturedCardContent>
        </FeaturedCard>
    </div>

    <FeaturedButton className="button is-rounded">{data.featuredViewAll}</FeaturedButton>
    <FeaturedBanner onClick={() => console.log("FeaturedBanner click")} className="is-rounded" style={{
        backgroundImage: `url(${
        !!data.featuredBanner.image.childImageSharp
            ? data.featuredBanner.image.childImageSharp.fluid.src
            : data.featuredBanner.image
        })`,
    }}>
        <FeaturedBannerHeader>
            {data.featuredBanner.heading1}
            <br />
            <FeaturedBannerHeaderStrong>{data.featuredBanner.heading2}</FeaturedBannerHeaderStrong>
        </FeaturedBannerHeader>
    </FeaturedBanner>

    <FeaturedFooter>
        {data.featuredFooter.heading1}
        <br />
        <FeaturedFooterStrong>{data.featuredFooter.heading2}</FeaturedFooterStrong>
    </FeaturedFooter>

    <FeaturedLogos>
        {data.featuredLogo.map(logo=><img src={
        !!logo.image.childImageSharp
            ? logo.image.childImageSharp.fluid.src
            : logo.image
        } />)}
    </FeaturedLogos>
</FeaturedWrap>

export default props => (
    <StaticQuery
      query={graphql`{
  allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
    edges {
      node {
        frontmatter {
          featured {
            heading1
            heading2
          }
          course1 {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
            heading
            description
          }
          featuredViewAll
          featuredBanner {
            heading1
            heading2
            image{
              childImageSharp{
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
          },
          featuredFooter {
            heading1
            heading2
          },
          featuredLogo {
              image{
              childImageSharp{
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
}`} render={data => <Featured data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)

Featured.propTypes = {
    data: PropTypes.object.isRequired,
}