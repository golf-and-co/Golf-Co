import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrap = styled.section`
  background-color: #f5f8f1;
  padding: 10px 30px 30px 30px;
`

const Paragraph = styled.div`
  max-width: 920px;
  margin: 20px auto;
  color: #7c7c7b;
  text-align: center;
  font-weight: 500;

  @media (max-width: 768px) {
    margin: 5px auto;
  }
`

const Heading = styled.h1`
  text-align: center;
  font-size: 150%;
  color: #1d8649;
  font-weight: 900;
`

const Button = styled.div`
  text-align: center;

  a {
    margin: 0 auto;
    width: 250px;
  }
`

const Content = ({ data }) => (
  <Wrap>
    <Paragraph>{data.paragraph1}</Paragraph>
    <Heading>{data.heading1}</Heading>
    <Paragraph>{data.paragraph2}</Paragraph>
    <Heading>Why Use Our Corporate Golf Service?</Heading>
    <Paragraph>{data.paragraph3}</Paragraph>
    <Paragraph>{data.paragraph4}</Paragraph>
    <Button><a href="/" className="button is-link is-rounded">{data.sendEnquiry}</a></Button>
  </Wrap>
)

export default Content

Content.propTypes = {
  data: PropTypes.object.isRequired,
}
