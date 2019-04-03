import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Course } from "../components/Featured";
import { v4 } from "uuid";

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
    padding-bottom: 50px;

    p,
    h1 {
      text-align: center;
    }
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
  color: #fff;
  cursor: pointer;

  i {
    color: #4d768b;
  }
`;

const BodyHeader = styled.h1`
  color: #1d8649;
  font-family: "Gotham Book";
  font-size: 18px;
  font-weight: 700;
  margin: 30px 0;
`;

const CartWrap = styled.aside`
  box-shadow: 0px 2px 11px 0px rgba(29, 134, 73, 0.44);
  background: #fff;
  border-radius: 10px;

  ul li {
    color: #4a4a4a;
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    letter-spacing: 0px;
    padding: 10px 20px;
    border-bottom: 1px solid #cfddbb;
  }

  ul li .disclaimer {
    color: #9b9b9b;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    margin-left: 3.5rem;
  }

  .is-checkradio[type="radio"] + label::before,
  .is-checkradio[type="radio"]:hover:not([disabled]) + label::before,
  .is-checkradio[type="checkbox"].is-white:hover:not([disabled])
    + label::before {
    border: 1px solid #cfddbb !important;
    background: #f6f9f2;
  }

  .is-checkradio[type="checkbox"]:checked + label::before {
    background: #1d8649 !important;
  }

  .shaded {
    background: #f6f9f2;
  }
`;

const CartHeader = styled.div`
  letter-spacing: 0;
  padding: 20px;

  h3 {
    color: #1d8649;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0;
  }

  p {
    color: #1a428a;
    font-size: 32px;
    line-height: 43px;
    text-align: center;
    font-weight: bold;
    letter-spacing: 0;
  }

  p.disclaimer {
    color: #9b9b9b;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    text-align: center;
    text-transform: none;
    letter-spacing: 0;
  }
`;

const CartBanner = styled.div`
  background: #1d8649;
  h3 {
    font-size: 22px;
    font-weight: bold;
    line-height: 29px;
    text-align: center;
    color: #fff;
    padding-top: 10px;
  }

  p {
    color: #fff;
    text-transform: none;
    font-size: 12px;
    letter-spacing: 0;
    text-align: center;
    padding: 0px 20px 20px 20px;
    line-height: 14px;
  }
`;

const Courses = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto 50px auto;

  a {
    margin: 10px auto;
  }

  & .content {
    font-size: 18px;
  }
`;

const addOnChange = ({ id, price }) => {
  if (!isNaN(parseInt(price))) {
    if (document.querySelector(`#${id}`).checked) {
      document.querySelector("#basePrice").innerHTML = (
        parseInt(document.querySelector("#basePrice").innerHTML) +
        parseInt(price)
      ).toString();
    } else {
      document.querySelector("#basePrice").innerHTML = (
        parseInt(document.querySelector("#basePrice").innerHTML) -
        parseInt(price)
      ).toString();
    }
  }
};

const AddOns = ({ addOn }) => {
  const slug = addOn.title.replace(/ /g, "-");

  const classes = () => {
    if (addOn.shaded) return "shaded";
  };

  return (
    <li className={classes()}>
      <div className="field">
        <input
          className="is-checkradio is-white"
          id={slug}
          type="checkbox"
          name={slug}
          value={addOn.description}
          onChange={() => addOnChange({ id: slug, price: addOn.price })}
        />
        <label htmlFor={slug}>
          + {addOn.title}
          <br />
          <span className="disclaimer">{addOn.description}</span>
        </label>
      </div>
    </li>
  );
};

const Cart = ({ data, addOns }) => {
  return (
    <CartWrap className="menu">
      <CartHeader className="menu-label">
        <h3>Starting from</h3>
        <p id="basePrice">{data.basePrice}</p>
        <h3>USD / Person</h3>
        <p className="disclaimer">
          (Prices calculated based on twin sharing basis for two people)
        </p>
      </CartHeader>
      <CartBanner className="menu-label">
        <h3>Add-Ons</h3>
        <p>
          Make your trip even more memorable with these carefully chosen
          facilities and excursions
        </p>
      </CartBanner>
      <form action="/send-request" method="GET">
        <input type="hidden" name="Course" value={data.title} />
        <ul className="menu-list">
          {addOns
            .filter(addOn => {
              return data.addOns.includes(addOn.node.frontmatter.title);
            })
            .map(addOn => (
              <AddOns addOn={addOn.node.frontmatter} key={v4()} />
            ))}
          <li>
            <input
              name="submit"
              type="submit"
              className="button is-link is-rounded"
              value="Send Enquiry"
              style={{ margin: "20px auto", display: "block", width: "80%" }}
            />
          </li>
        </ul>
      </form>
    </CartWrap>
  );
};

const CartDetails = ({ data, addOns }) => {
  // Convert carriage returns to br
  if (typeof data.description === "string") {
    data.description = data.description.split("\n").map((item, key) => {
      return (
        <span key={key}>
          {item}
          <br />
        </span>
      );
    });
  }

  return (
    <Background className="columns">
      <div className="column is-three-quarters">
        <ShareWrapper>
          <Share>
            <i className="fas fa-share-square" /> Share
          </Share>
        </ShareWrapper>

        <BodyHeader>{data.bodyHeader}</BodyHeader>
        <Courses>
          {data.courses.map(course => {
            return (
              <Course
                data={{
                  fields: course,
                  frontmatter: {
                    featuredDetails: course,
                    city: course.city,
                    region: course.region,
                    country: course.region,
                    stats: []
                  }
                }}
                key={v4()}
              />
            );
          })}
        </Courses>
        <p>{data.description}</p>
      </div>
      <div className="column is-one-quarters">
        <Cart data={data} addOns={addOns} />
      </div>
    </Background>
  );
};

export default CartDetails;

CartDetails.propTypes = {
  data: PropTypes.object.isRequired
};
