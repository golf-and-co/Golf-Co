import {group, rollup} from "d3-array";

/**
 * Groups data from array of objects
 * @param {Array} data Array of objects to group 
 * @param {*} field Name of object property to group on, send an array of fields to drill down two deep
  */
export const aggregate = (edges, field) => {
  if(typeof field.column !== 'undefined') {
    // @TODO: more efficent algo. Perhaps group first, then flatten 2D rows, then group again?
    // or rollup, like used below, and iterate through maps?
    // also accept batch aggregations, one loop multiple  outputs
    let result = {};
    edges.forEach(edge => {
      if(Array.isArray(edge.node.frontmatter[field['column']])) {
        edge.node.frontmatter[field['column']].forEach(item =>
          result[item[field['property']]]=false
        )
      }
    });
    return Object.keys(result).filter(item => item !== "null");
  } else if(typeof field.parent !== 'undefined') {
    // parent child return, useful when needing to return something like value:city, parent:country
    let result = [];
    rollup(edges, v => v.length, d => d.node.frontmatter[field.child], d => d.node.frontmatter[field.parent])
    .forEach(function(parent, child) {
      result.push({value:child, parent:parent.keys().next().value})
    });
    return result;
  }
  else {
    return Array.from(group(edges, d => {
      return d.node.frontmatter[field]
    }).keys());
  }
}

