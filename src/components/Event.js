import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'

const CalendarWrapper = styled.section`
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

const EventWrap = styled.section`
  color: #9b9b9b;
  font-family: "Gotham Book";
  font-size: 14px;
  font-weight: 300;
  background-color: #FFF;
  width: 260px;
  margin: 25px;
`

const EventDate = styled.section`
  color: #1d8649;
  font-family: "Gotham Bold";
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
`

const EventDateLabel = styled.section`
  font-size: 11px;
`

const EventTitle = styled.section`
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

const Event = ({card}) => <EventWrap>
  <EventDate>{card.from} <EventDateLabel>to</EventDateLabel>{card.to}</EventDate>
  <EventTitle>{card.title}</EventTitle>
</EventWrap>;

const  Calendar = ({data, headline}) =>{
console.log(data.edges[1].node.frontmatter);
console.log(headline);
return <CalendarWrapper>
    <Header>
      {headline.heading1}
      <br />
      <HeaderStrong>{headline.heading2}</HeaderStrong>
    </Header>
      {data.edges.map( (data) => <Event class="columns" key={data.node.frontmatter.title} event={data.node.frontmatter} /> )}
    <ViewAllButton className="button is-rounded" onClick="console.log(`Blog View All Click`">View All</ViewAllButton>
</CalendarWrapper>
}


export default props => (
    <StaticQuery
      query={graphql`{allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "event"}}} limit:3 sort:{fields:frontmatter___date, order:DESC}){
        edges{
          node{
            frontmatter{
              title
              from
              to
            }
            
          }
        }
      }
      }`} render={data => <Calendar data={data.allMarkdownRemark} {...props} />} />
)
            
Blog.propTypes = {
    data: PropTypes.object.isRequired,
}