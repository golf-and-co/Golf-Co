import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const InfoWrap = styled.section`
  background-color: #f6f9f2;
  padding: 90px 0 220px 0;
  justify-content: center;
`

const Infographic = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    max-width: 200px;
    margin: auto 45px;
  }

  @media (max-width: 768px) {
    max-width: 200px;
    margin: auto;
  }
`

const InfoHeading = styled.p`
  height: 41px;
  color: #1d8649;
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 1;
`

const InfoBody = styled.p`
  color: #4a4a4a;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;

  @media (min-width: 768px) {
    width: 200px;
    height: 80px;
  }
`

const Info = ({ data }) => (
  <InfoWrap className="columns is-desktop">
    <Infographic className="column is-one-quarter">
      <img src={data.info1.image.publicURL} alt="Tailor Made" />
      <InfoHeading>{data.info1.heading}</InfoHeading>
      <InfoBody>{data.info1.description}</InfoBody>
    </Infographic>

    <Infographic className="column is-one-quarter">
      <img src={data.info2.image.publicURL} alt="Tailor Made" />
      <InfoHeading>{data.info2.heading}</InfoHeading>
      <InfoBody>{data.info2.description}</InfoBody>
    </Infographic>

    <Infographic className="column is-one-quarter">
      <img src={data.info3.image.publicURL} alt="Tailor Made" />
      <InfoHeading>{data.info3.heading}</InfoHeading>
      <InfoBody>{data.info3.description}</InfoBody>
    </Infographic>

    <Infographic className="column is-one-quarter">
      <img src={data.info4.image.publicURL} alt="Tailor Made" />
      <InfoHeading>{data.info4.heading}</InfoHeading>
      <InfoBody>{data.info4.description}</InfoBody>
    </Infographic>
  </InfoWrap>
)

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(filter: { frontmatter: { title: { eq: "Home" } } }) {
          edges {
            node {
              frontmatter {
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
    `}
    render={data => (
      <Info
        data={data.allMarkdownRemark.edges[0].node.frontmatter}
        {...props}
      />
    )}
  />
)

Info.propTypes = {
  data: PropTypes.object.isRequired,
}
