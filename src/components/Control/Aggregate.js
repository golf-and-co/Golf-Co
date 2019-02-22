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
  if(Array.isArray(field)) {
    // @TODO: more efficent algo. Perhaps group first, then flatten 2D rows, then group again?
    let result = {};
    edges.forEach(edge => {
      if(Array.isArray(edge.node.frontmatter[field[0]])) {
        edge.node.frontmatter[field[0]].forEach(item =>
          result[item[field[1]]]=false
        )
      }
    });
    return Object.keys(result);
  } else {
    return Array.from(group(edges, d => d.node.frontmatter[field]).keys());
  }
}