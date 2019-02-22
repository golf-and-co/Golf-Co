import { isObject } from "util";

let courseTypes = {}; 
let holes = {};
let amenities = {};

/**
 * Groups data from array of objects
 * @param {Array} data Array of objects to group 
 * @param {*} field Name of object property to group on, supports unstructured data
 */
const aggregate = (data, field) => {
    if(isObject(field)) {
      // structured data
    } else {
      data.courses.edges.forEach(edge => 
        edge.node.frontmatter[field].filter(type => type.name !== null).forEach(type => {
          // courseType label:checked
          courseTypes[type.name] = filters.some(filter => (type.name === filter.value && filter.field === "courseType"));
        })
      );
    }
    
    
      console.log(courseTypes);

    Array.from(group(data.courses.edges, d => d.node.frontmatter.holes).keys()).forEach(holeCount => {
        holes[holeCount] = filters.some(filter => (holeCount === filter.value && filter.field === "holes"))      
    });

      
    data.courses.edges.forEach(edge => 
      edge.node.frontmatter.amenities.filter(amenity => amenity.name !== null).forEach(amenity => 
        // amenity label:checked
        amenities[amenity.name] = filters.some(filter => (amenity.name === filter.value && filter.field === "amenities"))
      )
    );
  } 
  rollup();