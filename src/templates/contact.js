import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import queryString from "query-string";
import Layout from "../components/Layout";
import HeroSmall from "../components/HeroSmall";
import Footer from "../components/Footer";

const Wrap = styled.div`
  background: #f6f9f2;
  padding-bottom: 345px;
  padding-top: 35px;

  @media (max-width: 768px) {
    padding: 20px 20px 100px 20px;
  }

  h6 {
    color: #5267a3;
    text-align: left;
    margin: 20px auto 10px auto;
    font-size: 1.2rem;
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

  .sidebar {
    background-color: #dae6cd;
    padding: 0;

    img {
      height: 250px;
      width: 250px;
      object-fit: cover;
    }

    .body {
      padding: 10px;
    }
    p,
    label {
      color: #435a98;
    }
    p {
      font-weight: bold;
    }
    label {
      font-weight: normal;
      border-bottom: 1px solid #1d8649;
    }
    ul li ul li:before {
      content: "+";
      margin-right: 4px;
    }
    ul li ul li {
      margin-bottom: 0rem;
      font-weight: bold;
    }
    li {
      color: #435a98;
      margin-bottom: 1.2rem;
    }
  }

  .contactForm {
    padding-left: 40px;

    h2 {
      color: #253f8e;
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
  }
`;

const DatePicker = styled.input`
  border: 1px solid #d9d9d9;
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 30px;
  display: block;
  margin: 0;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
`;

const NumberInput = styled.input`
  border: 1px solid #d9d9d9;
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 30px;
  display: block;
  margin: 0;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  padding-left: 20px;
`;

const Contact = ({ data, location }) => {
  const url = queryString.parse(location.search);

  // to avoid updating the markdown schema for packages
  let nights = 0;
  if (!!url.nights) {
    nights = url.nights.split("+")[0];
  }

  // to avoid refactoring props and using react router, addons passed as json in URL
  let addOns = [];
  if (!!url.addOns) {
    addOns = JSON.parse(url.addOns);
  }

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
            <div className="column is-3 sidebar">
              <img
                src="/static/d6050f4008ae6df127cfe84347ba1644/e139a/abu-dhabi-golf-club_next-golf-1.jpg"
                alt="Course landscape for this package"
              />
              <div class="body">
                <ul>
                  <li>
                    <label>Code</label>
                    <p>{url.code}</p>
                  </li>
                  <li>
                    <label>City</label>
                    <p>{url.city}</p>
                  </li>
                  <li>
                    <label>Country</label>
                    <p>{url.country}</p>
                  </li>
                  <li>
                    <label>Nights</label>
                    <p>{nights}</p>
                  </li>
                  <li>
                    <label>Rounds of Golf</label>
                    <p>{url.rounds}</p>
                  </li>
                  <li>
                    <label>Hotel</label>
                    <p>{url.hotel}</p>
                  </li>
                  <li>
                    <label>Add-Ons</label>
                    <ul>
                      {addOns.map(addOn => (
                        <li>{addOn}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="column is-9 contactForm">
              <h2>Booking Enquiry Form</h2>
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
                        name="email"
                        className="input is-rounded"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-5">
                    <div className="control">
                      <input
                        name="Country"
                        className="input is-rounded"
                        type="text"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                  <div className="column is-3">
                    <div className="control">
                      <input
                        name="areaCode"
                        className="input is-rounded"
                        type="text"
                        placeholder="UAE (+971)"
                        defaultValue="UAE (+971)"
                      />
                    </div>
                  </div>
                  <div className="column is-4">
                    <div className="control">
                      <input
                        name="phone"
                        className="input is-rounded"
                        type="text"
                        placeholder="Phone"
                      />
                    </div>
                  </div>
                </div>
                <h6>Package Specifics</h6>
                <div className="columns purpose">
                  <div className="column is-half" style={{ display: "block" }}>
                    <label>Proposed Arrival Date</label>

                    <div
                      className="control has-icons-right"
                      style={{ width: "100%", margin: "0" }}
                    >
                      <DatePicker
                        name="arrival"
                        className="is-rounded"
                        type="date"
                        id="datepicker"
                        required={"required"}
                        defaultValue={new Date().toISOString().slice(0, 10)}
                      />
                      <span className="icon is-small is-right">
                        <i
                          className="fa fa-calendar is-right"
                          style={{ color: "#1d8649", right: "15px" }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="column is-half" style={{ display: "block" }}>
                    <label>Proposed Departure Date</label>
                    <div
                      className="control has-icons-right"
                      style={{ width: "100%", margin: "0" }}
                    >
                      <DatePicker
                        name="departure"
                        className="is-rounded"
                        type="date"
                        id="datepicker"
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        required={"required"}
                      />
                      <span className="icon is-small is-right">
                        <i
                          className="fa fa-calendar is-right"
                          style={{ color: "#1d8649", right: "15px" }}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="columns purpose">
                  <div className="column is-half" style={{ display: "block" }}>
                    <label>Number of Golfers</label>
                    <NumberInput
                      type="number"
                      pattern="[0-9]*"
                      data-numeric-input
                      required
                      min="0"
                      name="golfers"
                    />
                  </div>
                  <div className="column is-half" style={{ display: "block" }}>
                    <label>Number of Non-Golfers</label>
                    <NumberInput
                      type="number"
                      pattern="[0-9]*"
                      data-numeric-input
                      required
                      min="0"
                      name="nongolfers"
                    />
                  </div>
                </div>
                <textarea
                  name="notes"
                  className="textarea is-rounded"
                  placeholder="Please enter any additional comments (if any)"
                />
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
