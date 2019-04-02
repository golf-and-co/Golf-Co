import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { v4 } from "uuid";

const Wrap = styled.div`
    display: flex;
    margin-top: -100px;
    position: relative;
    z-index: -10;

    > section {
        width: 100vw;
        padding-top: 100px;
    }

    #stats {
        background-color: #1B8243;
    }

    #cart {
        background-color: #1B8243;
        font-size: 22px;
        font-weight: 700;
        line-height: 64px;
        vertical-align: middle;
        text-align: center;
        text-transform: uppercase;
    }

    @media (max-width: 768px) {
        #cart {
            line-height: 22px;
        }

`;

const List = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0 0 20px 0;
`;

const Item = styled.li`
  display: flex;
  background-color: #1b8243;
  border-right: 1px dashed #000;
  padding: 1px 40px;
  text-align: center;

  &:last-child {
    border-right: none !important;
  }

  @media (max-width: 768px) {
    padding: 1px 20px;
    display: none;

    &:first-child {
      display: block;
    }
    &:nth-child(2) {
      display: block;
    }
  }
`;

const Label = styled.h6`
  text-transform: uppercase;
  margin: 0 10px;
`;

const Value = styled.span`
  text-transform: uppercase;
`;

const StatItem = ({ data }) => (
  <Item>
    <img id="image" src={data.icon.publicURL} alt={data.label} />
    <Label>{data.label}</Label>
    <Value>{data.value}</Value>
  </Item>
);

const CartStat = ({ data }) => {
  return (
    <Wrap>
      <section id="cart">
        <List>
          <Item>
            <img id="image" src="" alt={data.label} />
            <Label>{data.label}</Label>
            <Value>{data.value}</Value>
          </Item>
          <Item>
            <img id="image" src="" alt={data.label} />
            <Label>{data.label}</Label>
            <Value>{data.value}</Value>
          </Item>

          {data.stats.map(stat => (
            <StatItem data={stat} key={v4()} />
          ))}
        </List>
      </section>
    </Wrap>
  );
};

export default CartStat;

CartStat.propTypes = {
  data: PropTypes.object.isRequired
};
