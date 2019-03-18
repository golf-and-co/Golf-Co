import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown';
import { v4 } from 'uuid'

const Background = styled.div`
  background-color: #f6f9f2;
  padding: 0 75px;
  margin-bottom: 0 !important;

  p {
    color: #000000;
    font-family: 'Gotham Book';
    font-size: 16px;
    font-weight: 300;
    line-height: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  .cart{
    border-radius: 6px;
    box-shadow: 0px 2px  11px rgba(29,134,73,0.44);
    width: 260px;
    height: 249px;
    background-color: #FFF;
    
    @media (max-width: 768px) {
      margin: 0 auto;
    }
  }

  .cart h3 {
    background: #1b8547;
    border-radius: 6px 6px 0 0;
    font-size: 22px;
    font-weight: 400;
    text-align:center;
    padding: 20px 20px 10px 20px;
  }

  .cart .body {
    background-color: #FFF;
    text-align:center;
    padding: 10px 30px;
  }

  .cart .body p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px
  }

  .cart button {
    margin-top: 20px;
    background: #1a428a;
    border-radius: 45.5px;
    padding: 10px 30px;
    border: none;
    color: #FFF;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
  }
`

const ShareWrapper = styled.div`
  text-align: right;
`

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
`

const BoxWrap = styled.article`
  display: flex;
  border-radius: 6px;
  border: 1px solid #8db397;
  background-color: #ffffff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);

  .message-header {
    @media (max-width: 768px) {
      display: none;
    }
  }
`

const DialogImg = styled.img`
  background-color: #1d8649;
  border-radius: 19px;
  margin: 11px;
  height: 46px;
  width: 46px;
  text-align: center;
  color: #fff;
  padding: 10px;
`

const TagsWrap = styled.ul`
  display: flex;
  background: #fff;
  padding: 30px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  color: #4a4a4a;
  font-family: 'Gotham Book';
  font-size: 14px;
  font-weight: 300;
  vertical-align: middle;
  flex-wrap: wrap;
`

const TagItem = styled.li`
  width: 160px;
  line-height: 25px;
  vertical-align: middle;
  background: #fff !important;

  img {
    float: left;
    margin-right: 15px;
    width: 20px;
    height: 25px;
    text-align: center;
  }

  div {
    float: left;
    width: 110px;
  }
`

const About = styled.h1`
  color: #1d8649;
  font-family: 'Gotham Book';
  font-size: 40px;
  font-weight: 300;
  margin-top: 30px;

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 2rem;
    margin: 20px auto;
    text-align:center;
  }
`

const Box = ({ data }) => {
  if(data.icon === null || data.header === "empty") {
    return <div />;
  }

  return <BoxWrap className={`message is-primary`}>
    <div className="message-header">
      <DialogImg id="image" src={data.icon.publicURL} />
      <p>{data.header}</p>
    </div>
    <div className="message-body">{data.message}</div>
  </BoxWrap>
}

const Tags = ({data}) => {
  if(data.tags[0].icon === null) {
    return <div />;
  }
  return <TagsWrap>
    {data.tags.map(tag => (
      <Tag key={v4()} data={tag} />
    ))}
  </TagsWrap>
}

const Tag = ({ data }) => (
  <TagItem className="tag">
    <img id="image" src={data.icon.publicURL} alt={data.label} />
    <div>{data.label}</div>
  </TagItem>
)

const Dialog = ({data}) => {

  if(data.dialogs.length ===) {
    return <div />;
  }
  return data.dialogs.map(dialog => (
    <Box key={v4()} data={dialog} />
  ));
}

const Cart = ({data}) => <div className="cart">
  <h3>Want to Tee-Off at this Golf Course?</h3>
  <div className="body">
    <p>Book from one of our Golf Packages, and let us know your preferred Golf Course.</p>
    <button onClick={() => {
      window.location = `/packages?city=${data.city}`
    }
    }>View Packages</button>
  </div>
</div>

const CourseDetails = ({ data, body }) => (
  <Background className="columns">
    <div className="column is-three-quarters">
      <ShareWrapper>
        <Share>
          <i className="fas fa-share-square" /> Share
        </Share>
      </ShareWrapper>
      <Dialog data={data} />
      <Tags data={data} className="tags" />
      <About>About {data.title}</About>
      <ReactMarkdown source={body} />
    </div>
    <div className="column is-one-quarters">
      <Cart data={data} />
    </div>
  </Background>
)

export default CourseDetails

CourseDetails.propTypes = {
  data: PropTypes.object.isRequired,
}
