import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Footer from "../components/Footer";

const Wrap = styled.div`
  background: #f6f9f2;
  padding-bottom: 345px;

  @media (max-width: 768px) {
    padding: 20px 20px 100px 20px;
  }

  h6 {
    color: #5267a3;
    text-align: center;
    margin: 20px auto 10px auto;
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

  .purpose .column {
    display: flex;
    margin-top: 30px;
  }

  .purpose input {
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

const Contact = ({ data }) => {
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
          <div className="columns">
            <div className="column is-one-fifth">
              <img src="/static/d6050f4008ae6df127cfe84347ba1644/e139a/abu-dhabi-golf-club_next-golf-1.jpg" />
              <ul>
                <li>
                  <label>Code</label>
                  <p>XXXXXX</p>
                </li>
                <li>
                  <label>City</label>
                  <p>Pattaya</p>
                </li>
                <li>
                  <label>Country</label>
                  <p>Thailand</p>
                </li>
                <li>
                  <label>Nights</label>
                  <p>7</p>
                </li>
                <li>
                  <label>Rounds of Golf</label>
                  <p>3</p>
                </li>
                <li>
                  <label>Hotel</label>
                  <p>XXXXXXXXXXXX</p>
                </li>
                <li>
                  <label>Add-Ons</label>
                  <ul>
                    <li>Club Rental</li>
                    <li>Additional Round</li>
                    <li>Golf Insurance</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="column is-fourth-fifths">
              <form
                data-netlify="true"
                name="request"
                method="POST"
                data-netlify-honeypot="bot-field"
              >
                <div className="columns">
                  <div className="column is-one-fifth">
                    <div className="control">
                      <input
                        name="title"
                        className="input is-rounded"
                        type="text"
                        placeholder="Title"
                      />
                    </div>
                  </div>
                  <div className="column is-two-fifths">
                    <div className="control">
                      <input
                        name="firstName"
                        className="input is-rounded"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div className="column is-two-fifths">
                    <div className="control">
                      <input
                        name="lastName"
                        className="input is-rounded"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="columns">
                  <div className="column is-full">
                    <div className="control">
                      <input
                        name="company"
                        className="input is-rounded"
                        type="text"
                        placeholder="Company"
                      />
                    </div>
                  </div>
                </div>
                <h6>Your Contact Details</h6>
                <div className="columns">
                  <div className="column is-full">
                    <div className="control">
                      <input
                        name="email"
                        className="input is-rounded"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>

                <div className="columns is-mobile">
                  <div className="column is-2-desktop is-one-quarter-mobile">
                    <div className="control is-block-desktop is-hidden-mobile">
                      <input
                        name="areaCodeWork"
                        className="input is-rounded"
                        type="text"
                        placeholder="UAE (+971)"
                        defaultValue="UAE (+971)"
                      />
                    </div>
                    <div className="control is-hidden-desktop is-block-mobile">
                      <input
                        name="areaCodeWork"
                        className="input is-rounded"
                        type="text"
                        placeholder="+971"
                        defaultValue="+971"
                      />
                    </div>
                  </div>
                  <div className="column is-4-desktop is-three-quarters-mobile">
                    <div className="control">
                      <input
                        name="workPhone"
                        className="input is-rounded"
                        type="text"
                        placeholder="Work Phone"
                      />
                    </div>
                  </div>
                  <div className="column is-2-desktop is-one-quarter-mobile is-hidden-mobile is-flex-desktop">
                    <div className="control">
                      <input
                        name="areaCodeMobile"
                        className="input is-rounded"
                        type="text"
                        placeholder="UAE (+971)"
                        defaultValue="UAE (+971)"
                      />
                    </div>
                  </div>
                  <div className="column is-4-desktop is-three-quarters-mobile is-hidden-mobile is-flex-desktop">
                    <div className="control">
                      <input
                        name="workMobile"
                        className="input is-rounded"
                        type="text"
                        placeholder="Mobile Phone"
                      />
                    </div>
                  </div>
                </div>
                <div className="columns is-flex-mobile is-hidden-desktop">
                  <div className="column is-2-desktop is-one-quarter-mobile">
                    <div className="control">
                      <input
                        name="areaCodeMobile"
                        className="input is-rounded"
                        type="text"
                        placeholder="+971"
                        defaultValue="+971"
                      />
                    </div>
                  </div>
                  <div className="column is-4-desktop is-three-quarters-mobile">
                    <div className="control">
                      <input
                        name="workMobile"
                        className="input is-rounded"
                        type="text"
                        placeholder="Mobile Phone"
                      />
                    </div>
                  </div>
                </div>
                <h6>What is the Primary Purpose of the Event</h6>
                <div className="columns purpose">
                  <div className="column is-quarter">
                    <input
                      type="radio"
                      id="advertising"
                      name="purpose"
                      value="advertising"
                      checked
                    />
                    <label for="advertising">
                      Advertising / Promoting Brand
                    </label>
                  </div>
                  <div className="column is-quarter">
                    <input
                      type="radio"
                      id="clients"
                      name="purpose"
                      value="clients"
                      checked
                    />
                    <label for="clients">
                      Relationship Building with Clients and Staff
                    </label>
                  </div>
                  <div className="column is-quarter">
                    <input
                      type="radio"
                      id="launch"
                      name="purpose"
                      value="launch"
                      checked
                    />
                    <label for="launch">Product Launch</label>
                  </div>
                  <div className="column is-quarter">
                    <input
                      type="radio"
                      id="charity"
                      name="purpose"
                      value="charity"
                      checked
                    />
                    <label for="charity">Charity Day</label>
                  </div>
                </div>
                <input type="hidden" name="form-name" value="request" />
                <input
                  name="submit"
                  type="submit"
                  className="button is-link is-rounded"
                  value="Send This Request"
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

Contact.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired
    })
  })
};

export default Contact;

export const contactQuery = graphql`
  query contactQuery($id: String!) {
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
