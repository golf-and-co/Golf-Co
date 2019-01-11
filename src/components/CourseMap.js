import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Leaflet from 'leaflet';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet-universal';

const MapWrap = styled.div`
  height:100vh;
  position: relative;
  z-index:0;

  .map__reactleaflet {
    height: 100vh;
  }
`;

export const mapConfig = {
  center: [52.499219, 13.425416],
  zoom: 8
};

export const markers = [
  {
    name: 'Kottbusser Tor',
    latlng: [52.499040, 13.418392]
  }, {
    name: 'Görlitzer Park',
    latlng: [52.496912, 13.436738]
  }, {
    name: 'webkid',
    latlng: [52.501106, 13.422061]
  }
];

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/';

const CourseMap = ({data}) => { 
 
  // create an array with marker components
  const LeafletMarkers = markers.map(marker => (
    <Marker position={marker.latlng} key={`marker_${marker.name}`}>
      <Popup>
        <span>{marker.name}</span>
      </Popup>
    </Marker>
  ));

  return (
    <MapWrap className="map">
      <Map center={mapConfig.center} zoom={mapConfig.zoom} scrollWheelZoom={false} className="map__reactleaflet">
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
        />
        {LeafletMarkers}
      </Map>
    </MapWrap>
  );
};

export default CourseMap;

CourseMap.propTypes = {
  data: PropTypes.object.isRequired,
}