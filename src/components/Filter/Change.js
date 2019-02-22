const handler = (filter) => {
    if(filter.action === 'REMOVE') {
      // state update is async, so this is ugly but required
      let result = filters.filter(item => {
         return (item.field !== filter.field && item.value !== filter.value)
      });
      setFilters(result);
    } else if(filter.action === 'REPLACE') {
      // some fields require multiple filters of the same name, like course type
      // others must replace existing filter first, like city
      let result = filters.filter(item => {
         return (item.field !== filter.field && item.value !== filter.value)
      });
      result.push(filter);
      setFilters(result);
    } else {
      filters.push(filter);
      console.log(filters);
      rollup();
      setFilters(filters);
    }
  } 
