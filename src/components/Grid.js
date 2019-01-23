import React from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import {Course} from '../components/Featured';

const Wrap = styled.section`
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;

    a {
        margin: 10px;
    }
`;

const Grid = ({data}) => {
    /*
    edges: (2) […]
    ​​
        0: {…}
        ​​​
            node: {…}
            ​​​​
              frontmatter: {…}
            ​​​​​
                title: "Golf Packages"
    */

    
    // @TODO: factor out Course from featured, better adapter
    // what adapter wants:
    /*data.fields = {
        slug: 'a',
    };
    data.frontmatter = {};
    data.frontmatter.featuredDetails = {
        image: '',
        name: '',
        city: '',
        country: '',
    };*/
    
    return <Wrap>
        {data.edges.map(edge => {
        return <Course data = {{
            frontmatter:{
                featuredDetails: {
                    image: edge.node.frontmatter.image,
                    name: edge.node.frontmatter.title,
                    city: '',
                    country: '',
                },
            },
            fields: {
                slug: edge.node.frontmatter.title.replace(/ /g,''),
            }
        }} />
    }
        )}
    </Wrap>
}

Grid.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Grid;