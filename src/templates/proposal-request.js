import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Footer from "../components/Footer";

const Wrap = styled.div`
  background: #faf7f2;
  padding-bottom: 345px;

  @media (max-width: 768px) {
    padding: 20px 20px 100px 20px;
  }

  h6 {
    color: #5267a3;
    text-align: center;
    margin: 20px auto 10px auto;
  }

  .header {
    color: #b89348;
    font-size: 30px;
    text-align: center;
    padding: 20px 0;
    font-weight: bold;
    width 100%;
  }

  .info > p {
    margin-bottom: 20px;
    color: black !important;
  }

  .separator {
    background-color: #ba9751;
    width: 100%;
    height: 1px;
    margin: 30px 0;
  }

  .container {
    max-width: 980px;
  }

  label {
    display: flex;
    align-items: center;
    color: #1d8649;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;
  }

  p {
    color: #1d8649;
    line-height: 1.5rem;

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  .column {
    @media (max-width: 768px) {
      padding-bottom: 0;
    }
  }

  .field {
    text-align: center;
  }

  .input.is-rounded {
    margin: 0 auto;
    display: block;
    padding: 15px;
    border: 1px solid #81b997;
    box-shadow: 1px 1px 1px #cde1cf;
  }

  .control {
    width: 100%;
  }

  .callback .column {
    display: flex;
    margin-top: 30px;
  }

  .callback input {
    margin-right: 10px;
  }

  input.button {
    margin: 20px auto;
    text-align: center;
    display: block;
    text-transform: uppercase;
    padding: 0 50px;
    height: 3rem;
    background-color: #1f4388;
    font-weight: bold;
  }

  .textarea.is-rounded {
    border-radius: 20px;

    @media (max-width: 768px) {
      margin: 0 auto;
      width: 80%;
      min-width: auto;
    }
  }
`;

const ProposalRequest = ({ data }) => {
  return (
    <Layout>
      <HeroSmall
        data={{
          ...data.markdownRemark.frontmatter,
          backgroundColor: "#F6F9F2",
          height: "160px",
          logoMargin: "30px"
        }}
      />
      <Wrap>
        <div className="container">
          <div className="header">TEE OFF YOUR IDEAL ITINERARY</div>
          <div className="info">
            <p>At Golf & Co. we understand that every person is unique, which is
why we pride ourselves on crafting Bespoke Packages that make
dreams come true both on and off the course.</p>
            <p>Please share your personal requirements in the form below and
we will be in touch within 24 hours.</p>
          </div>
          <div className="separator"></div>
          <div className="columns">
            <div className="column is-fourth-fifths">
              <form
                data-netlify="true"
                name="request"
                method="POST"
                data-netlify-honeypot="bot-field"
              >
                <h6>PROPOSAL REQUEST FORM</h6>
                <div className="columns">
                  <div className="column is-full">
                    <div className="control">
                      <input
                        name="name"
                        className="input is-rounded"
                        type="text"
                        placeholder="Your Name (required)"
                      />
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-full">
                    <div className="control">
                      <input
                        name="mail"
                        className="input is-rounded"
                        type="text"
                        placeholder="Your Email Address (required)"
                      />
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-half">
                    <div className="control">
                      <input
                        name="country"
                        className="input is-rounded"
                        type="text"
                        placeholder="Country of Residence"
                      />
                    </div>
                  </div>
                  <div className="column is-half">
                    <div className="control">
                      <input
                        name="phoneNumber"
                        className="input is-rounded"
                        type="text"
                        placeholder="Your Phone Number (required)"
                      />
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-full">
                    <div className="control">
                      <input
                        name="region"
                        className="input is-rounded"
                        type="text"
                        placeholder="Region You Are Interested In"
                      />
                    </div>
                  </div>
                </div>

                <div className="columns">
                  <div className="column is-4">
                    <div className="control">
                      <input
                        name="dateOfTour"
                        className="input is-rounded"
                        type="text"
                        placeholder="Date of Tour"
                      />
                    </div>
                  </div>
                  <div className="column is-4">
                    <div className="control">
                      <input
                        name="duration"
                        className="input is-rounded"
                        type="text"
                        placeholder="Duration"
                      />
                    </div>
                  </div>
                  <div className="column is-4">
                    <div className="control">
                      <input
                        name="numberOfGuests"
                        className="input is-rounded"
                        type="text"
                        placeholder="No of guests"
                      />
                    </div>
                  </div>
                </div>
                
                <h6>METHOD OF CALL BACK</h6>
                <div className="columns callback">
                  <div className="column is-quarter">
                    <input
                      type="radio"
                      id="email"
                      name="callbackMethod"
                      value="email"
                      checked
                    />
                    <label for="email">
                      Email
                    </label>
                  </div>
                  <div className="column is-quarter">
                    <input
                      type="radio"
                      id="morning"
                      name="callbackMethod"
                      value="morning"
                      checked
                    />
                    <label for="morning">
                      Morning
                    </label>
                  </div>
                  <div className="column is-quarter">
                    <input
                      type="radio"
                      id="afternoon"
                      name="callbackMethod"
                      value="afternoon"
                      checked
                    />
                    <label for="afternoon">Afternoon</label>
                  </div>
                  <div className="column is-quarter">
                    <input
                      type="radio"
                      id="evening"
                      name="callbackMethod"
                      value="evening"
                      checked
                    />
                    <label for="evening">Evening</label>
                  </div>
                </div>
                <input type="hidden" name="form-name" value="request" />
                <input
                  name="submit"
                  type="submit"
                  className="button is-link is-rounded"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </Wrap>
      <Footer />
    </Layout>
  );
};

ProposalRequest.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    })
  })
};

export default ProposalRequest;

export const proposalRequestQuery = graphql`
  query proposalRequestQuery($id: String!) {
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
`;
