// @TODO: Clean this up big time. Probably will be taken out when using redux

// input: fields, data
// output: JSX view

  // assigns css properties to each item
  const fields = [{"primary":"country", "secondary":"city"}, "hotelType", "duration"];

  const index = (fields, data) => {

  // build data for filter from packages:
  data.forEach(edge =>{
    const row = edge.node.frontmatter;
    // When country select box changes, need to update city select box
    // Handled by passing an object to data instead of an array

    fields.map(field => {
      if(field )
    }

    boxes.location.data[row.country].push(row.city);
    boxes.country.data.push(row.country);
    boxes.city.data.push(row.city);
    // normal filters, checkboxes
    boxes.hotelType.data.push(row.hotelType);
    boxes.duration.data.push(row.duration);
  });

  // deduplicate
  Object.keys(boxes.location.data).forEach(country => {
    boxes.location.data[country] = [...new Set(boxes.location.data[country])];
  });
  boxes.hotelType.data = Array.from(new Set(boxes.hotelType.data));
  boxes.duration.data = Array.from(new Set(boxes.duration.data));

  });

}