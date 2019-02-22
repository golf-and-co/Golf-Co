let courseTypes = {}; 
let holes = {};
let amenities = {};

const rollup = () => {
    console.log('rolling up');
    data.courses.edges.forEach(edge => 
      edge.node.frontmatter.courseType.filter(type => type.name !== null).forEach(type => {
        // courseType label:checked
        courseTypes[type.name] = filters.some(filter => (type.name === filter.value && filter.field === "courseType"));
      })
    );
    
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