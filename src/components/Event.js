import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

const CalendarWrapper = styled.section`
  justify-content: center;
`

const Header = styled.section`
  color: #1d8649;
  /* Text style for "LET’S TALK" */
  font-family: 'Gotham Light';
  font-weight: 300;
  font-size: 30px;
  text-transform: uppercase;
  text-align: center;
`

const HeaderStrong = styled.strong`
  color: #1d8649;
  font-family: 'Gotham Black';
  font-weight: 900;
`

const EventWrap = styled.section`
  color: #9b9b9b;
  font-family: 'Gotham Book';
  font-size: 14px;
  font-weight: 300;
  background-color: #fff;
  margin: 12px 25px 36px 25px !important;
`

const EventDate = styled.section`
  color: #1d8649;
  font-family: 'Gotham Bold';
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 6px;
  background-color: #cfddbb;
  padding: 20px;
`

const EventDateLabel = styled.section`
  font-size: 11px;
  line-height: 0.8;
`

const EventTitle = styled.section`
  padding: 25px 20;
  color: #1a428a;
  font-family: 'Gotham Book';
  font-size: 18px;
  font-weight: 300;
  line-height: 20px;
`

const ViewAllButton = styled.button`
  display: block !important;
  margin: 44px auto 0px auto;
  background: none;
  color: #1d8649;
  font-weight: 300;
  text-transform: uppercase;
  border-color: #1d8649;
  padding: 0 30px !important;
`

const Event = ({ event }) => (
  <EventWrap className="columns">
    <EventDate className="column is-one-quarter">
      {moment(event.from).format('D MMM')} <EventDateLabel>to</EventDateLabel>
      {moment(event.to).format('D MMM')}
    </EventDate>
    <EventTitle className="column is-three-quarter">{event.title}</EventTitle>
  </EventWrap>
)

const Calendar = ({ data, headline }) => (
  <CalendarWrapper>
    <Header>
      {headline.heading1}
      <br />
      <HeaderStrong>{headline.heading2}</HeaderStrong>
    </Header>
    {data.edges.map(data => (
      <Event key={data.node.frontmatter.date} event={data.node.frontmatter} />
    ))}
    <ViewAllButton
      className="button is-rounded"
      onClick={() => console.log(`Blog View All Click`)}
    >
      View All
    </ViewAllButton>
  </CalendarWrapper>
)

export default props => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "event" } } }
          limit: 3
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                title
                from
                to
                date
              }
            }
          }
        }
      }
    `}
    render={data => <Calendar data={data.allMarkdownRemark} {...props} />}
  />
)

Calendar.propTypes = {
  data: PropTypes.object.isRequired,
}
