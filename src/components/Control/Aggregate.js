import { isObject } from "util";
import {group, rollup} from "d3-array";

let courseTypes = {}; 
let holes = {};
let amenities = {};

/**
 * Groups data from array of objects
 * @param {Array} data Array of objects to group 
 * @param {*} field Name of object property to group on, send an array of fields to drill down two deep
  */
export const aggregate = (edges, field) => {
  if(field instanceof Object) {
    // @TODO: more efficent algo. Perhaps group first, then flatten 2D rows, then group again?
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
  } else {
    return Array.from(group(edges, d => {
      return d.node.frontmatter[field]
    }).keys());
  }
}