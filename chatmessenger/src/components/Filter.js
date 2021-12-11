import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';


const Filter = ({posts, authorFilterValue, setAuthorFilterValue}) => {

    const getUniquePostFields = (fieldName) => {
        const foundItems = [];
    
        for (let post of posts) {
          if (!foundItems.includes(post[fieldName])) {
            foundItems.push(post[fieldName]);
          }
        }
    
        return foundItems.map((foundItem) => (
          <MenuItem key={foundItem} value={foundItem}>
            {foundItem}
          </MenuItem>
        ));
      };
    

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="authorFilter">Filter by Author</InputLabel>
            <Select
            name="authorFilter"
            placeholder="Filter"
            value={authorFilterValue}
            onChange={(e) => setAuthorFilterValue(e.target.value)}
            >
            <MenuItem key={0} value={""}>
                All
            </MenuItem>
            {getUniquePostFields("author")}
            </Select>
        </FormControl>
    )
}

export default Filter;
