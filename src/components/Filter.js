import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'

const Wrap = styled.section`
    display: flex;
`;

const Box = styled.section`
    background-color: #FFF;
    width: 260px;
    height:215px;
    justify-content:right;
`;

const Filter = ({data}) => <Wrap>
    <Box />
</Wrap>

Filter.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Filter;