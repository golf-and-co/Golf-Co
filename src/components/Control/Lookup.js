/**
 * Lookup rows with matching properties
 * @param {Array} data 
 * @param {Array} search
 */
export const lookup = (data, searches) => data.filter(row => 
    searches.every(search => {
        // does search contain a value?        
        if(typeof search.value === 'undefined') {
            // match on name only
            // used for if state exists
            return search.name === row.name;
        }
        else {
            // search does not contain value
            // looking for both name and value
            // used for filtering listings
            return search.name === row.name && search.value === row.value;
        }
    })
)            
