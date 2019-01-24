import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'
import Select from '../utilities/Select'
import { v4 } from 'uuid'
import Stats from '../components/Stats';

const Wrap = styled.section`
  background-color: #cfddbb;
  display:block;
  justify-content: center;
  border-radius: 45% 45% 0 0;
  width: 140%;
  margin-left: -20%;
  margin-top:-160px;

  @media (max-width: 768px) {
    border-radius: 35% 35% 0 0;
    width: 200%;
    margin-left: -50%;
  }

  .cardContentHover {
    height: 320px;
    top: -215px
  }
`;

const Heading = styled.h3`
  color: #1d8649 !important;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 300;
  text-align:center;
  padding: 50px 0 50px 0;
`;
const HeadingTag = styled.strong`
  font-weight: bold;
  font-family: "Gotham Bold";
`;

const CardLink = styled(Link)`
    margin: 0 auto;
`;

const Card = styled.div`
  width: 260px;
  height: 320px;
  border-radius: 6px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    margin: 0px auto 40px auto;
  }
`;

const CardImageWrap = styled.div`
  height: 216px;
  position: relative;
  z-index: 0;
`;

const CardImage = styled.img`
  height:216px !important;
`;

const CardContent = styled.div`
  color: #000000;
  font-size: 20px;
  font-weight: 300;
  padding: 16px 0 0 0px !important;
  position: relative;
  z-index: 100;
  background-color: #FFF !important;
  transition: height 1s ease-out, top 1s ease-out;
  height: 100px;
  top: 0px;
  overflow: hidden;

  #stats {
      width: 260px;
      height: 325px;
      background-color: #81AA8C;
  }

  #stats ul {
    color: #FFF;
    font-size: .8rem;
  }

  #stats ul li {
    border-color: #1d8649;
    padding-top: 10px;
  }

  #stats ul li i {
    color: #CFDDBB;
  }

  .content {
      margin-left: 15px;
   }
`;

const CardContentTag = styled.div`
  color: #9b9b9b;
  font-size: 14px;
  margin-top: 9px;
`;

const CardCaption = styled.div`
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

const Button = styled.button`
    display: block !important;
    margin: 50px auto 0px auto;
    background:none !important;
    color: #1d8649 !important;
    font-weight: 300;
    text-transform: uppercase;
    border-color: #1d8649 !important;
`;

const Banner = styled.aside`
    display: block;
    margin: 70px auto 70px auto;
    width: 700px;
    height: 90px;
    color: #FFF;
    font-size: 28px;
    cursor: pointer;
    
    :hover
        cursor:pointer;
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
    margin-left: 240px;
    padding-top: 10px;
    font-weight: bold;
    line-height:1.25;

    @media (max-width: 768px) {
        font-size: 18px;
        margin-left: 105px;
    }
`;

const BannerHeaderStrong = styled.strong`
    font-family: "Gotham Bold";
    margin-top:0;
    font-weight:700;
    color:#FFF;
    text-transform:uppercase;
`;

const Footer = styled.footer`
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

const FooterStrong = styled.footer`
    font-family: "Gotham Black";
    font-weight: 900;
`;

const Logos = styled.section`
    background-color: #aec3b2;
    display:flex;
    justify-content: center;
    padding: 75px 0;
`;

// No interface to trigger focus event outside this component is required, falling back to DOM instead of React props for class
// traditional way is to pass a prop, and rerender the component.
// how will that work with a functional component?
// @TODO: Use redux and observables, fire an event, featuredHover, to allow for other components to listen to it
const courseMouseEnter = (data) => {
    document.querySelector(`#${data.fields.slug.replace(/\//g,'')} .card-content`).className +=' cardContentHover';
}

const courseMouseExit = (data) => {
    let featured = document.querySelector(`#${data.fields.slug.replace(/\//g,'')} .card-content`);
    featured.className = featured.className.replace(/ cardContentHover/g, '');
}

export const Course = ({data}) => {
    console.log(data);
return <CardLink to={data.fields.slug} className="is-quarter">
    <Card id={data.fields.slug.replace(/\//g,'')} className="card" onMouseEnter={() => courseMouseEnter(data)} onMouseLeave={() => courseMouseExit(data)}>
        <CardImageWrap className="card-image">
        <figure className="image is-4by3">
            <CardImage src={
            !!data.frontmatter.featuredDetails.image.childImageSharp
                ? data.frontmatter.featuredDetails.image.childImageSharp.fluid.src
                : data.frontmatter.featuredDetails.image
            } alt="Placeholder" />
        </figure>
        <CardCaption>Dubai</CardCaption>
        </CardImageWrap>
        <CardContent className="card-content">
        <div className="content">
            {data.frontmatter.featuredDetails.name}
            <br />
            <CardContentTag>{data.frontmatter.city}, {data.frontmatter.country}</CardContentTag>
        </div>
        <Stats data={data.frontmatter} />
        </CardContent>
    </Card>
</CardLink>;
}

const Featured = ({home, courses}) => <Wrap>
    <Heading className="title">
    {home.featured.heading1}
    <br />
    <HeadingTag>{home.featured.heading2}</HeadingTag>
    <br />
    <Select options={[{value:"UAE"}]} />
    </Heading>
    
    <div className="container">
        <div className="columns">
            {courses.map(course => <Course key={v4()} data={course.node} />)}
        </div>
    </div>

    <Button className="button is-rounded">{home.featuredViewAll}</Button>

    <Banner onClick={() => console.log("Banner click")} className="is-rounded is-hidden-mobile" style={{
        backgroundImage: `url(${
        !!home.featuredBanner.image.childImageSharp
            ? home.featuredBanner.image.childImageSharp.fluid.src
            : home.featuredBanner.image
        })`,
    }}>
        <BannerHeader>
            {home.featuredBanner.heading1}
            <br />
            <BannerHeaderStrong>{home.featuredBanner.heading2}</BannerHeaderStrong>
        </BannerHeader>
    </Banner>

    <BannerMobile onClick={() => console.log("Banner click")} className="is-rounded is-hidden-tablet" style={{
        backgroundImage: `url(${
        !!home.featuredBanner.mobileImage.childImageSharp
            ? home.featuredBanner.mobileImage.childImageSharp.fluid.src
            : home.featuredBanner.mobileImage
        })`,
    }}>
        <BannerHeader>
            {home.featuredBanner.heading1}
            <br />
            <BannerHeaderStrong>{home.featuredBanner.heading2}</BannerHeaderStrong>
        </BannerHeader>
    </BannerMobile>

    <Footer>
        {home.featuredFooter.heading1}
        <br />
        <FooterStrong>{home.featuredFooter.heading2}</FooterStrong>
    </Footer>

    <Logos>
        {home.featuredLogo.map( (logo, index) => <img key={index} alt={logo.alt} src={
        !!logo.image.childImageSharp
            ? logo.image.childImageSharp.fluid.src
            : logo.image
        } />)}
    </Logos>
</Wrap>

export default props => (
    <StaticQuery
      query={graphql`{
  home:allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
    edges {
      node {
        frontmatter {
           featured {
              heading1
              heading2
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
            mobileImage{
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
  courses:allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "course"}, isFeatured:{eq: true}}}, limit:4 sort:{fields:frontmatter___date, order:DESC}){
    edges{
      node{
        fields{
          slug
        }
        frontmatter{
          isFeatured
          title
          city
          region
          country
          description
          featuredDetails{
            image{
              childImageSharp{
                fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
              }
            }
            name
            description            
          }
          stats{
            icon {
                publicURL
            }
            label
            value
          }
        }
      }
    }
  }
}`} render={data => <Featured home={data.home.edges[0].node.frontmatter} courses={data.courses.edges} {...props} />} />
)

Course.propTypes = {
    data: PropTypes.object.isRequired,
}