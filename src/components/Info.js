import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'

const InfoWrap = styled.section`
  background-color: #F6F9F2;
  display:flex;
  justify-content: center;
  padding:90px 0 220px 0;
`

const Infographic = styled.div`
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

const Info = ({data}) => <InfoWrap>
    <Infographic>
        <img src={data.info1.image.publicURL} alt="Tailor Made"/>
        <InfoHeading>{data.info1.heading}</InfoHeading>
        <InfoBody>{data.info1.description}</InfoBody>
    </Infographic>

    <Infographic>
        <img src={data.info2.image.publicURL} alt="Tailor Made"/>
        <InfoHeading>{data.info2.heading}</InfoHeading>
        <InfoBody>{data.info2.description}</InfoBody>
    </Infographic>

    <Infographic>
        <img src={data.info3.image.publicURL} alt="Tailor Made"/>
        <InfoHeading>{data.info3.heading}</InfoHeading>
        <InfoBody>{data.info3.description}</InfoBody>
    </Infographic>

    <Infographic>
        <img src={data.info4.image.publicURL} alt="Tailor Made"/>
        <InfoHeading>{data.info4.heading}</InfoHeading>
        <InfoBody>{data.info4.description}</InfoBody>
    </Infographic>
</InfoWrap>


export default props => (
    <StaticQuery
      query={graphql`{
      allMarkdownRemark(filter: {frontmatter: {title: {eq: "Home"}}}) {
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
    }`} render={data => <Info data={data.allMarkdownRemark.edges[0].node.frontmatter} {...props} />} />
)
            
Info.propTypes = {
    data: PropTypes.object.isRequired,
}