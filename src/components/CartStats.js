import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
    background-color: #1b8243;
  }

  #cart {
    background-color: #1b8243;
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
    .plusSign {
      display: none;
    }
  }

  .plusSign {
    display: flex;
    align-items: center;
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

  @media (max-width: 768px) {
    padding: 1px 10px;
  }

  &:last-child {
    @media (max-width: 768px) {
      display: none;
    }
  }

  img {
    height: 3rem;
    @media (max-width: 768px) {
      display: none;
    }
  }

  .description {
    text-align: left;
    margin-left: 20px;
    max-width: 230px;
    @media (max-width: 768px) {
      margin-left: 0;
      text-align: center;
    }
  }

  .description div {
    line-height: 1.5rem;
  }

  & > div {
    display: "flex";
    align-items: "center";
    margin-left: "30px";
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

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
            <div style={{}}>
              <div style={{ fontSize: "3rem", lineHeight: "3rem" }}>
                {data.duration[0]}
              </div>
              <div className="description">
                <div>Nights</div>
                <div style={{ fontSize: ".8rem", lineHeight: ".8rem" }}>
                  BB Basis
                </div>
              </div>
            </div>
          </Item>
          <div className="plusSign">+</div>

          <Item>
            <img
              id="image"
              src="/img/nearby_hotel.svg"
              alt="Bed front view with headboard and pillows"
            />
            <div>
              <div style={{ fontSize: "3rem", lineHeight: "3rem" }}>
                {data.rounds[0]}
              </div>
              <div className="description">
                <div>Rounds of Golf</div>
                <div style={{ fontSize: ".8rem", lineHeight: ".8rem" }}>
                  All greens fees include buggy & range balls
                </div>
              </div>
            </div>
          </Item>
          <div className="plusSign">+</div>
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
