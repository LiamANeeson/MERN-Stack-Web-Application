import React from 'react';

const Filter = ({posts, authorFilterValue, setAuthorFilterValue}) => {

    const getUniquePostFields = (fieldName) => {
        const foundItems = [];
    
        for (let post of posts) {
          if (!foundItems.includes(post[fieldName])) {
            foundItems.push(post[fieldName]);
          }
        }
    
        return foundItems.map((foundItem) => (
          <option key={foundItem} value={foundItem}>
            {foundItem}
          </option>
        ));
      };
    

    return (
        <div>
            <label htmlFor="authorFilter">Filter by Author:</label>
            <select
            name="authorFilter"
            placeholder="Filter"
            value={authorFilterValue}
            onChange={(e) => setAuthorFilterValue(e.target.value)}
            >
            <option key={0} value={""}>
                All
            </option>
            {getUniquePostFields("author")}
            </select>
        </div>
    )
}

export default Filter;
