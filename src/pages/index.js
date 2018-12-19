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
  display:flex;
  justify-content: center;
  height:400px;
  border-radius: 200%/195px 195px 0 0;
  margin-top:-60px;
`;

const FeaturedHeading = styled.h3`

`;
const FeaturedHeadingTag = styled.strong`

`;


export default class IndexPage extends React.Component {
  render() {
    const data = this.props.data.allMarkdownRemark.edges[0].node.frontmatter
    console.log("data is")
    console.log(data)
    

    return (
      <Layout>
        <Hero style={{
                  backgroundImage: `url(${data.image})`,
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
        }
      }
    }
  }
}
`