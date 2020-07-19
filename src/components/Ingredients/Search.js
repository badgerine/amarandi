import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  //executes after every re/render cycle of this cycle | 
  //[] only rerun when changes are detected on the properties listed in the array => effectively componentDidMount().
  useEffect(() => {
    setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch('https://burger-builder-ed94e.firebaseio.com/ingredients.json' + query)
          .then(response => {
            return response.json();
          }).then(responseData => {
            console.log('responseData=', responseData);
            const loadedIngredients = [];
            for (let key in responseData) {
              loadedIngredients.push({
                id: key,
                ...responseData[key]
              });
            }
            // setIngredients(loadedIngredients.filter(ingredient => (ingredient.amount != null)));
            onLoadIngredients(loadedIngredients.filter(ingredient => (ingredient.amount != null)));
          });
      }
    }, 800)
  }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
