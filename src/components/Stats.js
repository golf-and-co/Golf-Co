import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { v4 } from 'uuid'

const Section = styled.section`
  background-color: #81aa8c;
`

const List = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0 0 20px 0;
`

const Item = styled.li`
  background-color: #81aa8c;
  border-right: 1px dashed #000;
  padding: 1px 25px;
  text-align: center;
  
  img {
    height: 23px;
  }

  &:last-child {
    border-right: none !important;
  }
`

const Label = styled.h6`
  text-transform: uppercase;
`

const Value = styled.span`
  text-transform: uppercase;
`

const StatItem = ({ data }) => (
  <Item>
    <img id="image" src={data.icon.publicURL} alt={data.label} />
    <Label>{data.label}</Label>
    <Value>{data.value}</Value>
  </Item>
)

const StatList = ({ data, hideStats }) => {
  if(hideStats) return <span />;

  return <Section id="stats">
    <List>
      {data.stats.map(stat => (
        <StatItem data={stat} key={v4()} />
      ))}
    </List>
  </Section>
}

export default StatList

StatList.propTypes = {
  data: PropTypes.object.isRequired,
}
