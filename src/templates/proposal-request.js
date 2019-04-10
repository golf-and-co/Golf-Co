import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Footer from "../components/Footer";

const Wrap = styled.div`
  background: #faf7f2;
  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding: 20px 20px 80px 20px;
  }

  h6 {
    color: #b69148;
    text-align: center;
    font-weight: lighter;
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
    text-align: center;
  }

  .form-header {
    margin-bottom: 25px;
    font-size: 20px;
    color: #b69148;
    text-align: center;
  }

  .separator {
    background-color: #ba9751;
    width: 100%;
    height: 1px;
    margin: 30px 0;
  }

  .enquiry {
    resize: none;
    height: 150px;
    border-radius: 40px !important;
  }

  .container {
    max-width: 980px;
  }

  label {
    display: flex;
    align-items: center;
    color: #b69148;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;
  }

  p {
    color: #b69148;
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
    border: 1px solid #ba9751;
  }

  .control {
    width: 100%;
  }

  .callback .column {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }

  .callback .column label {
    font-weight: lighter;
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
    background-color: #b69148;
    font-weight: bold;
  }

  input.button:hover {
    background-color: #e8c174 !important;
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
            <p>
              At Golf & Co. we understand that every person is unique, which is
              why we pride ourselves on crafting Bespoke Packages that make
              dreams come true both on and off the course.
            </p>
            <p>
              Please share your personal requirements in the form below and we
              will be in touch within 24 hours.
            </p>
          </div>
          <div className="separator" />
          <div className="columns">
            <div className="column is-fourth-fifths">
              <form
                data-netlify="true"
                name="request"
                method="POST"
                data-netlify-honeypot="bot-field"
              >
                <div className="form-header">PROPOSAL REQUEST FORM</div>
                <div className="columns">
                  <div className="column is-full">
                    <div className="control">
                      <input
                        name="name"
                        className="input is-rounded"
                        type="text"
                        placeholder="Your Name (required)"
                        required
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
                        required
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
                        required
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
                    <label for="email">Email</label>
                  </div>
                  <div className="column is-quarter">
                    <input
                      type="radio"
                      id="morning"
                      name="callbackMethod"
                      value="morning"
                      checked
                    />
                    <label for="morning">Morning</label>
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
                <div className="columns">
                  <div className="column is-full">
                    <div className="control">
                      <textarea
                        name="enquiry"
                        className="input is-rounded enquiry"
                        type="text"
                        placeholder="Your enquiry"
                      />
                    </div>
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
