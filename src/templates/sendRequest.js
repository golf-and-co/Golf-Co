import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout';
import HeroSmall from "../components/HeroSmall";
import Footer from '../components/Footer';

const Wrap = styled.div`
  background: #F6F9F2;
  padding-bottom: 345px; 

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

  button {
    margin: 0 auto;
    display: block;
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





const SendRequest = ({ data }) => <Layout>
  <HeroSmall data={{...data.markdownRemark.frontmatter, backgroundColor:"#F6F9F2", height:"160px", logoMargin:"30px"}} />
  <Wrap>
    <Content>We are all set to take your request. Just fill up the form below.</Content>
    <form>
      <div className="container">
        <div className="columns">
          <div className="column">
              <div className="field">
                  <label className="label">Date</label>
                  <div className="control">
                      <DatePicker className="is-rounded" type="date" id="datepicker" defaultValue={new Date().toISOString().slice(0, 10)}/>
                  </div>
              </div>

              <div className="field">
                  <label className="label">First Name</label>
                  <div className="control">
                      <input className="input is-rounded" type="text"/>
                  </div>
              </div>

              <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                      <input className="input is-rounded" type="text"/>
                  </div>
              </div>
          </div>

              

          <div className="column">
              <div className="field">
                  <label className="label">Number of Players</label>
                  <div className="control">
                      <input className="input is-rounded" type="text"/>
                  </div>
              </div>
              <div className="field">
                  <label className="label">Last Name</label>
                  <div className="control">
                      <input className="input is-rounded" type="text"/>
                  </div>
              </div>
              <div className="field">
                  <label className="label">Contact Number</label>
                  <div className="control">
                      <div id="phoneWrap">
                        <input className="input is-rounded" type="text" id="countryCode"/> <input className="input is-rounded" type="text" id="phone"/>
                      </div>
                      <p>Our representative will call you on this number to personalise your trip.</p>
                  </div>
              </div>
          </div>
          </div>
          <div className="field">
                <label className="label">Notes</label>
                <div className="control">
                  <textarea className="textarea is-rounded"/>
                </div>
              </div>

              <div className="control">
                <button className="button is-link is-rounded">Send This Request</button>
              </div>
      </div>
    </form>
  </Wrap>
  <Footer />
</Layout>;

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
      }
    }
  }
`
