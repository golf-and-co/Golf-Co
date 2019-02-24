/**
 * Lookup rows with matching properties
 * @param {Array} data 
 * @param {Array} search
 */
export const lookup = (data, searches) => data.filter(row => 
    // Each individual line in rows of data
    searches.every(search => {
        // Each search provided by user
        if(typeof search.value === 'undefined') {
            // for controls when only name is to provided, to find value in state
            return search.name === row.name;
        }
        else {
            // for contorls which have multiple values, and need to see if exists
            return search.name === row.name && search.value === row.value;
        }
    })
)            
