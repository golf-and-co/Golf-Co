import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { v4 } from 'uuid'

const settings = {
  dots: true,
  adaptiveHeight: true,
  infinite: false,
}

const Background = styled.div`
  background-color: #f6f9f2;
  padding: 0 74px;
  display: block !important;

  @media(max-width:768px) {
    padding: 0 25px !important;
  }
`

const SliderWrap = styled(Slider)`
  width: 100%
  margin: 0 auto;
  padding-bottom: 150px !important;
  padding-right: 2px !important;

  .slick-dots {
    bottom: auto !important
  }

  .slick-arrow {
    z-index: 2;
    &:first-of-type {
      left: 35px;
    }

    &:last-of-type {
      right: 35px;
    }
  }

  .slick-prev {
    top: calc((100% - 140px) / 2)
  }

  .slick-next {
    top: calc((100% - 140px) / 2)
  }

  @media(max-width:768px) {
    padding-bottom: 90px !important;

    .slick-prev {
      top: calc((100% - 80px) / 2)
    }
  
    .slick-next {
      top: calc((100% - 80px) / 2)
    }
  }
`

const Header = styled.h1`
  color: #1d8649;
  font-family: 'Gotham Book';
  font-size: 40px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 2rem;
    padding: 20px !important;
    text-align:center;
  }
`

const Slide = styled.div`
  &:not(first-child) {
    padding: 0 10px 0 0px;
}
`

const Gallery = ({ data }) => {
  if(data.gallery[0].image === null)
    return <div />;

  return (
    <Background className="columns">
      <Header className="column">Gallery</Header>
      <SliderWrap className="column" {...settings}>
        {data.gallery.map(exhibit => (
          <Slide key={v4()}>
            <img
              alt={exhibit.category}
              src={exhibit.image.childImageSharp.fluid.src}
            />
          </Slide>
        ))}
      </SliderWrap>

    </Background>
  )
}
export default Gallery

Gallery.propTypes = {
  data: PropTypes.object.isRequired,
}
