const locationFilters = [
    {"field":"city", "value":queryString.parse(location.search).city, "action":"ADD"},
    {"field":"country", "value":queryString.parse(location.search).country, "action":"ADD"}
];

let defaultValue = {
    // @TODO: default value looks for object, need to lookup city and country from filter
    primary:filters.filter(item => item.field ==='country')[0],
    secondary:filters.filter(item => item.field ==='city')[0],
}

  
if(typeof defaultValue.primary !== 'undefined') defaultValue.primary = defaultValue.primary["value"];
if(typeof defaultValue.secondary !== 'undefined') defaultValue.secondary = defaultValue.secondary["value"]; 
