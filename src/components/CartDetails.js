import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const Background = styled.div`
  background-color: #f6f9f2;
  padding: 0 75px;
  margin-bottom: 0 !important;
  padding-bottom: 160px;

  p {
    color: #000000;
    font-family: "Gotham Book";
    font-size: 16px;
    font-weight: 300;
    line-height: 20px;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const ShareWrapper = styled.div`
  text-align: right;
`;

const Share = styled.button`
  width: 90px;
  height: 30px;
  border-radius: 46px;
  background-color: #81aa8c;
  border: none;
  margin-bottom: 20px;
  color: #FFF;
  cursor: pointer;

  i {
    color: #4d768b;
  }
`;

const Tags = styled.ul`
  display: flex;
  background: #FFF;
  padding: 30px;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
  color: #4a4a4a;
  font-family: "Gotham Book";
  font-size: 14px;
  font-weight: 300;
  vertical-align: middle;  
`;

const TagItem = styled.li`
  width: 160px;
  line-height: 25px;
  vertical-align: middle;
  background: #fff !important;
  
  img {
    float:left;
    margin-right: 15px;
    width:20px;
    height: 25px;
    text-align:center;
  }

  div {
    float:left;
    width: 110px;
  }
`;

const About = styled.h1`
  color: #1d8649;
  font-family: "Gotham Book";
  font-size: 40px;
  font-weight: 300;
  margin-top: 30px;
`;

const Cart = () => <aside class="menu">
<p class="menu-label">
  General
</p>
<ul class="menu-list">
  <li><a>Dashboard</a></li>
  <li><a>Customers</a></li>
</ul>
<p class="menu-label">
  Administration
</p>
<ul class="menu-list">
  <li><a>Team Settings</a></li>
  <li>
    <a class="is-active">Manage Your Team</a>
    <ul>
      <li><a>Members</a></li>
      <li><a>Plugins</a></li>
      <li><a>Add a member</a></li>
    </ul>
  </li>
  <li><a>Invitations</a></li>
  <li><a>Cloud Storage Environment Settings</a></li>
  <li><a>Authentication</a></li>
</ul>
<p class="menu-label">
  Transactions
</p>
<ul class="menu-list">
  <li><a>Payments</a></li>
  <li><a>Transfers</a></li>
  <li><a>Balance</a></li>
</ul>
</aside>;

const CartDetails = ({data}) => <Background className="columns">
  <div className="column is-three-quarters">
    <ShareWrapper>
      <Share><i className="fas fa-share-square"></i> Share</Share>
    </ShareWrapper>

    <About>About {data.title}</About>
    <p>{data.description}</p>
  </div>
  <div className="column is-one-quarters">
    <Cart />
  </div>
</Background>

export default CartDetails;

CartDetails.propTypes = {
  data: PropTypes.object.isRequired,
}