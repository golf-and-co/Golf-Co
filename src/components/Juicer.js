import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Container = styled.ul`
  background-color: #cfddba;
  padding: 0 10vw 50px;

  .juicer-feed.modern li.feed-item {
    border: none;
  }

  li[data-source="juicer"] {
    display: none !important;
  }

  .referral > a {
    display: none !important;
  }

  .j-paginate.juicer-button {
    display: block !important;
    margin: 50px auto 50px auto;
    background: none !important;
    color: #1d8649 !important;
    font-weight: 300;
    text-transform: uppercase;
    border-color: #1d8649 !important;
    width: 300px;
    border-radius: 20px;
  }
`

const Juicer = ({count, columns}) => <Container>
  <ul className='juicer-feed' data-feed-id='golfandco' data-per={count} data-columns={columns}>
    <h1 className='referral'><a href='www.juicer.io'>Powered by Juicer</a></h1>
  </ul>
</Container>

Juicer.propTypes = {
  count: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
}

export default Juicer;