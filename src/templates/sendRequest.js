import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout';
import HeroSmall from "../components/HeroSmall";
import ReactCountryFlag from "react-country-flag";
import Footer from '../components/Footer';

const Wrap = styled.div`
  background: #F6F9F2;
  padding-bottom: 345px; 

  .container {
    max-width: 980px;
  }

  label {
    color: #1d8649;
    font-weight: 700;
    text-transform: uppercase;
    margin-top:30px;
    font-size: 14px;
  }

  p {
    color: #1d8649;
    line-height: 1.5rem;
  }

  .field {
    text-align: center;
  }

  .input.is-rounded {
    margin: 0 auto;
    display: block;
    max-width: 300px;
    padding: 15px;
  }

  #phoneWrap {
    display: flex;
    justify-content: center;
  }

  #phoneWrap .icon.is-left {
    left: 6px;
  }

  #countryCode {
    width: 125px;
    margin: 0 5px;
  }

  #phone {
    width: 165px;
    border-radius: 20px;
    margin: 0 10px;
  }

  .textarea.is-rounded {
    border-radius: 20px;
  }

  input[type="submit"] {
    margin: 0 auto;
    display: block;
  }

  input[type="date"]
  {
      -webkit-appearance: none;
  }

  input[type="date"]::-ms-clear {
    display: none;
  }
  input[type="date"]::-webkit-inner-spin-button,    
  input[type="date"]::-webkit-clear-button { display: none; }

  .players-wrapper {
    display: block;
    width: 150px;
    margin: 0 auto;
  }

  .players-wrapper input {
    width:150px;
    padding: 10px 15px;
    text-align: center;
  }

  .decrease-button, .increase-button {   
    position: absolute;
    z-index: 1;
    border-radius: 15px;
    box-shadow: none;
    border: 1px solid #dbdbdb;
    background: #FFF;
    height: 28px;
    top: 5px;
    width: 30px;
    padding: 0px;
    font-size: 30px;
    line-height: 15px;
    vertical-align: middle;
    color: #dbdbdb;
  }
  
  .decrease-button {
    left: 5px;
  } 
  
  .increase-button {
    right: 5px;
  }

`;

const Content = styled.div`
  color: #1a428a;
  text-align: center;
  padding: 45px 0 50px 0;
`;

const DatePicker = styled.input`
  border: 1px solid #d9d9d9;
  width: 210px;
  height: 40px;
  padding: 8px;
  border-radius: 30px;
  display: block;
  margin: 0 auto;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
`;





const SendRequest = ({ data }) => {

  const [countryCode, setcountryCode] = useState("AE");
  const [numberOfPlayers, setNumberOfPlayers] = useState(1);

return <Layout>
  <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#F6F9F2", height:"160px", logoMargin:"30px"}} />
  <Wrap>
    <Content>We are all set to take your request. Just fill up the form below.</Content>
      <div className="container">
      <form name="contact" method="POST" data-netlify="true">
  <p>
    <label>Your Name: <input type="text" name="name" /></label>   
  </p>
  <p>
    <label>Your Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Your Role: <select name="role[]" multiple>
      <option value="leader">Leader</option>
      <option value="follower">Follower</option>
    </select></label>
  </p>
  <p>
    <label>Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
      </div>
  </Wrap>
  <Footer />
</Layout>;
}

SendRequest.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    }),
  }),
}

export default SendRequest

export const sendRequestQuery = graphql`
  query sendRequestQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
      }
    }
  }
`
