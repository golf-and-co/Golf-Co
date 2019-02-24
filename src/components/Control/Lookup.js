/**
 * Lookup rows with matching properties
 * @param {Array} data 
 * @param {Array} search
 */
export const lookup = (data, searches) => data.filter(row => 
    // Each individual line in rows of data
    searches.every(search => {
        // Each search provided by user
        return search.name === row.name && search.value === row.value;
    })
)            
