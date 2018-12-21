import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import styled from "styled-components"

const Hero = styled.section`
  height: 805px;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #F6F9F2;
`
const Heading = styled.h1`
  margin-top: 500px;
  text-align: center;
  color: white !important;
  font-family: "Gotham Book";
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 300;`

const HeadingTag = styled.strong`
  font-size: 60px;
  font-weight: 700;
`

const Search = styled.aside`
  width: 640px;
  height: 90px;
  margin: 0 auto;
  border-radius:46px;
  box-shadow: 0 4px 4px rgba(29, 134, 73, 0.14);
  background-color: #ffffff;
  margin-top: 60px;
  line-height: 90px;
  text-align: center;
`

const SelectWrap = styled.div`
  vertical-align: middle;
  width: 180px;
  height: 50px !important;
  margin: auto 10px;
  font-size: 1rem;
`

const Select = styled.select`
  height: auto !important;
  line-height: 50px;
  height: 48px !important;
  width: 180px;
`

const Button = styled.a`
  font-family: "Gotham Book";
  vertical-align: middle;
  margin: auto 10px;
  width: 200px;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
`
const InfoWrap = styled.section`
  background-color: #F6F9F2;
  display:flex;
  justify-content: center;
  padding-bottom:60px;
`

const Info = styled.div`
  width:200px;
  text-align:center;
  margin: auto 45px;
`

const InfoHeading = styled.p`
  height: 41px;
  color: #1d8649;
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  line-height:1;
`

const InfoBody = styled.p`
  width: 200px;
  height: 80px;
  color: #4a4a4a;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
`

const Featured = styled.section`
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
}

`;

export default class IndexPage extends React.Component {
  render() {
    const data = this.props.data.allMarkdownRemark.edges[0].node.frontmatter
    

    return (
      <Layout>
        <Hero style={{
                  backgroundImage: `url(${
                    !!data.image.childImageSharp
                      ? data.image.childImageSharp.fluid.src
                      : data.image
                  })`,
                }}>
          <div className="container content">
            <div className="column is-10 is-offset-1">
              <Heading className="title">
                {data.heading1}
                <br />
                <HeadingTag>{data.heading2}</HeadingTag>
              </Heading>
            </div>
          </div>
          <Search>
            <SelectWrap className="select is-rounded">
              <Select>
                <option>UAE</option>
              </Select>
            </SelectWrap>
            <SelectWrap className="select is-rounded">
              <Select>
                <option>Select City</option>
              </Select>
            </SelectWrap>
            <Button className="button is-link is-rounded">View Golf Course</Button>
          </Search>
        </Hero>

        <InfoWrap>
          <Info>
            <img src={data.info1.image.publicURL} alt="Tailor Made"/>
            <InfoHeading>{data.info1.heading}</InfoHeading>
            <InfoBody>{data.info1.description}</InfoBody>
          </Info>
        
          <Info>
            <img src={data.info2.image.publicURL} alt="Tailor Made"/>
            <InfoHeading>{data.info2.heading}</InfoHeading>
            <InfoBody>{data.info2.description}</InfoBody>
          </Info>

          <Info>
            <img src={data.info3.image.publicURL} alt="Tailor Made"/>
            <InfoHeading>{data.info3.heading}</InfoHeading>
            <InfoBody>{data.info3.description}</InfoBody>
          </Info>

          <Info>
            <img src={data.info4.image.publicURL} alt="Tailor Made"/>
            <InfoHeading>{data.info4.heading}</InfoHeading>
            <InfoBody>{data.info4.description}</InfoBody>
          </Info>
        </InfoWrap>

        <Featured>
          <FeaturedHeading className="title">
            {data.featured.heading1}
            <br />
            <FeaturedHeadingTag>{data.featured.heading2}</FeaturedHeadingTag>
            <br />
            <SelectWrap className="select is-rounded">
              <Select>
                <option>UAE</option>
              </Select>
            </SelectWrap>
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
        </Featured>


        
      </Layout>
    )
  }
}

/*

              <p>{description}</p>
              <PostContent content={content} />
              {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
*/

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const IndexQuery = graphql`
query HomePage {
  allMarkdownRemark(filter: {frontmatter: {title:{eq:"Home"}}}) {
    edges {
      node {
        frontmatter{
          heading1
          heading2
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          info1 {
            heading
            description
            image {
              publicURL
            } 
          }
          info2 {
            heading
            description
            image {
              publicURL
            } 
          }
          info3 {
            heading
            description
            image {
              publicURL
            } 
          }
          info4 {
            heading
            description
            image {
              publicURL
            } 
          }
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
        }
      }
    }
  }
}
`