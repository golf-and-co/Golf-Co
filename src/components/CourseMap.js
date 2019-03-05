import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const MapWrap = styled.div`
  height: 100vh;
  position: relative;
  z-index: 0;

  @media (max-width: 768px) {
    margin-top: 32px;
  }

  .map__reactleaflet {
    height: 100vh;
  }
`
/*
<iframe
      id="courseMap"
      title="courseMap"
      src={`https://www.google.com/maps/embed/v1/place?q=${
        data.map
      }&key=AIzaSyDQs2MX2IHTKR_ng_dfAhLk-ob2Hwahy6M&zoom=15`}
      
    />

    */
const CourseMap = ({ data }) => (
  <MapWrap>
    <iframe src={`http://maps.google.com/maps?q=${data.map}&z=15&output=embed`} id="courseMap" title="courseMap" style={{ width: '100%', height: '100%' }} frameborder="0" ></iframe>
    
  </MapWrap>
)

export default CourseMap

CourseMap.propTypes = {
  data: PropTypes.object.isRequired,
}
