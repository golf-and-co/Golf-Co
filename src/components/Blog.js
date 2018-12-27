import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'

const Cards = styled.section`
  justify-content: center;
`

const Header = styled.section`
  color: #1d8649;
  /* Text style for "LET’S TALK" */
  font-family: "Gotham Light";
  font-weight: 300;
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
`

const HeaderStrong = styled.strong`
  color: #1d8649;
  font-family: "Gotham Black";
  font-weight: 900;
`

const CardWrap = styled.section`
  color: #9b9b9b;
  font-family: "Gotham Book";
  font-size: 14px;
  font-weight: 300;
  background-color: #FFF;
  width: 260px;
  margin: 25px;
`

const CardHeader = styled.section`
  color: #000000;
  font-family: "Gotham Book";
  font-size: 18px;
  line-height: 20px;
  font-weight: 300;
  padding: 12px 20px 0px 15px;
`
const CardDescription = styled.section`
  font-size: 14px;
  padding: 12px 20px 15px 15px;
`

const ViewAllButton = styled.button`
    display: block;
    margin: 44px auto 0px auto;
    background:none;
    color: #1d8649;
    font-weight: 300;
    text-transform: uppercase;
    border-color: #1d8649;
    padding: 0 30px !important;
`;

const Card = ({card}) => <CardWrap>
  <div><img src={card.image.publicURL} alt={card.title}/></div>
  <CardHeader>{card.title}</CardHeader>
  <CardDescription>{card.description}</CardDescription>
</CardWrap>;

const  Blog = ({data, headline}) => <Cards>
    <Header>
      {headline.heading1}
      <br />
      <HeaderStrong>{headline.heading2}</HeaderStrong>
    </Header>
    <div class="columns">
      {data.edges.map( (data) => <Card class="column is-half" key={data.node.frontmatter.title} card={data.node.frontmatter} />)}
    </div>
    <ViewAllButton className="button is-rounded" onClick="console.log(`Blog View All Click`">View All</ViewAllButton>
</Cards>

export default props => (
    <StaticQuery
      query={graphql`{allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "post"}}} limit:2 sort:{fields:frontmatter___date, order:DESC}){
        edges{
          node{
            frontmatter{
              title
              description
              image {
                publicURL
              }
            }
            
          }
        }
      }
      }`} render={data => <Blog data={data.allMarkdownRemark} {...props} />} />
)
            
Blog.propTypes = {
    data: PropTypes.object.isRequired,
}