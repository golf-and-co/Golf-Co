import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { v4 } from 'uuid'

const Section = styled.section`
  background-color: #81aa8c;

  button.button.is-success {
    background-color: #1d8649;
    font-size: 14px;
    margin: 15px auto;
    display: block;
  }
`

const List = styled.ul`
  display: flex;
  justify-content: flex-start;
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

const StatItem = ({ data, style }) => {
  data.label = data.label.split(" ");
  data.label = data.label[0];
  return <Item style={style}>
    <img id="image" src={data.icon.publicURL} alt={data.label} />
    <Label>{data.label}</Label>
    <Value>{data.value}</Value>
  </Item>
}

const StatList = ({ data, fields, slug, hideStats, center, button }) => {
  if(hideStats) return <span />;

  const listStyle = {};
  const itemStyle = {};
  if(center) {
    listStyle.justifyContent="center";
  }
  else {
    // for cards
    data.stats = data.stats.slice(0,3);
    itemStyle.width = "86px";
    itemStyle.padding ="10px";
  }

  let Button = () => {
    if(button) {
      return <button onClick={() => window.location = fields.slug}  className="button is-success is-rounded">View Course Details</button>
    }
    else {
      return <span />
    }
  }

  return <Section onClick={() => window.location = slug} id="stats">
    <List style={listStyle}>
      {data.stats.map(stat => (
        <StatItem data={stat} key={v4()} style={itemStyle}/>
      ))}
    </List>
    <Button />
  </Section>
}

export default StatList

StatList.propTypes = {
  data: PropTypes.object.isRequired,
}
