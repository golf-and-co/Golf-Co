import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Container = styled.ul`
  background-color: #cfddba;
  padding: 0 50px 50px;

  .j-paginate.juicer-button {
    display: none;
  }

  .juicer-feed.modern li.feed-item {
    border: none;
  }
`

const Juicer = ({count, columns}) => <Container>
  <ul className='juicer-feed' data-feed-id='golfandco' data-per={count} data-columns={columns}>
    <h1 class='referral'><a href='www.juicer.io'>Powered by Juicer</a></h1>
  </ul>
</Container>

Juicer.propTypes = {
  count: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
}

export default Juicer;