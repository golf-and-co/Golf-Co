import React, {useState} from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Grid from '../components/Grid'

const Background = styled.section`
    padding-bottom: 200px;
    background-color: #E4ECD9;
`;

const Wrap = styled.section`
    @media (min-width: 768px) {
        width: 1110px;
        max-width: 100%;
    }
    margin: 0 auto !important;
`;

const FilterWrap = styled.div`
    section {
        justify-content: right;
    }
    @media (max-width: 768px) {
        display: none !important;
    }
`;

const hide = () => { 
    
    // checkbox classes
    let classes = Array.from(document.querySelectorAll('.is-checkradio:checked')
        ).filter(
            el => el.checked
        ).map(
            el => el.getAttribute("id")
    );
    // select classes
    document.querySelectorAll(".select.filter").forEach(select => {
        if (select.value === '--label--') return;
        classes.push(select.getAttribute("data-field")+"-"+select.value);
    });
    if(classes.length > 0) {
        document.querySelectorAll(".filterable").forEach(el => el.style.display="none");
        document.querySelectorAll('.'+classes.join(".")).forEach(el => el.style.display="flex");
    } else {
        document.querySelectorAll(".filterable").forEach(el => el.style.display="flex");
    }
}

const Listing = ({data, side, filter, slugType, footer, hideStats, location}) => <Background>
    <Wrap className="columns">
        <FilterWrap className="column is-one-fifth">
            {side}
        </FilterWrap>
        <div className="column is-four-fifth">
            <Grid data={data} filter={filter} slugType={slugType} footer={footer} hideStats={hideStats} location={location} />
        </div>
    </Wrap>
</Background>

Listing.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Listing;