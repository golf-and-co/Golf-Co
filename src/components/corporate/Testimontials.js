import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import PropTypes from 'prop-types'

const Wrap = styled.section`
  background-color: #f5f8f1;
  padding: 30px;
  height: 615px;

  p {
    max-width: 920px;
    
    color: #1d8649;
    text-align: center;
    font-weight: 900;
    font-size: 30px;

    @media (max-width: 768px) {
      margin: 5px auto;
    }
  }
`

const Heading = styled.h1`
  text-align: center;
  font-size: 200%;
  margin: 0 auto 10px auto !important;
  color: #1d8649;
  font-weight: 900;
`

const Testimontials = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Testimontial = styled.div`
  width: 360px;
  height: 320px;
  border-radius: 6px;
  background-color: #ffffff;
  margin: 0px 15px 0px 15px;
  padding: 0 20px;

  @media (max-width: 768px) {
    margin: 0px auto 40px auto;
  }
`

const ProfilePicture = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: silver;
  margin: 20px auto;
`

const Comment = styled.div`
  height: 40%;
  text-align: justify;
  color: #848484;
  overflow: auto;
  margin-bottom: 20px;
  line-height: 135%;
`

const Signature = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  color: #2d8f56;
  line-height: 135%;
`
const Position = styled.div`
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  color: #828381;
  line-height: 135%;
`
const Location = styled.div`
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  color: #828381;
  line-height: 135%;
`

const Content = ({data}) =>   <Wrap>
  <Heading>Testimontials</Heading>
  
  <Testimontials>
    <Testimontial>
      <ProfilePicture></ProfilePicture>
      <Comment>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Comment>
      <Signature>Maria Goldwin</Signature> 
      <Position>HR Manager</Position>
      <Location>BMW, MENA</Location>
    </Testimontial>
    <Testimontial>
      <ProfilePicture></ProfilePicture>
      <Comment>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Comment>
      <Signature>Maria Goldwin</Signature>
      <Position>HR Manager</Position>
      <Location>BMW, MENA</Location>
    </Testimontial>
    <Testimontial>
      <ProfilePicture></ProfilePicture>
      <Comment>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Comment>
      <Signature>Maria Goldwin</Signature>
      <Position>HR Manager</Position>
      <Location>BMW, MENA</Location>
    </Testimontial>
  </Testimontials>
</Wrap>


export default Content;
            
Content.propTypes = {
    data: PropTypes.object.isRequired,
}