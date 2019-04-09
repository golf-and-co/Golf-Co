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
  padding: 1px 40px;
  text-align: center;
  align-items: center;

  img {
    height: 3rem;
  }

  .description {
    text-align: left;
    margin-left: 20px;
    max-width: 220px;
  }

  .description div {
    line-height: 1.5rem;
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
            <img
              id="image"
              src="/img/nearby_hotel.svg"
              alt="Bed front view with headboard and pillows"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "30px"
              }}
            >
              <div style={{ fontSize: "3rem" }}>{data.duration[0]}</div>
              <div className="description">
                <div>Nights</div>
                <div style={{ fontSize: ".8rem", lineHeight: ".8rem" }}>
                  BB Basis
                </div>
              </div>
            </div>
          </Item>
          <div style={{ padding: "1px" }}>
            <div>+</div>
          </div>
          <Item>
            <img
              id="image"
              src="/img/nearby_hotel.svg"
              alt="Bed front view with headboard and pillows"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "30px"
              }}
            >
              <div style={{ fontSize: "3rem" }}>{data.rounds[0]}</div>
              <div className="description">
                <div>Rounds of Golf</div>
                <div style={{ fontSize: ".8rem", lineHeight: ".8rem" }}>
                  All greens fees include buggy & range balls
                </div>
              </div>
            </div>
          </Item>
          <div>
            <div>+</div>
          </div>
          <Item>Airport & Golf Transfers</Item>
        </List>
      </section>
    </Wrap>
  );
};

export default CartStat;

CartStat.propTypes = {
  data: PropTypes.object.isRequired
};
