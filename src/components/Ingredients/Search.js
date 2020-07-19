import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(()=> {
    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https://burger-builder-ed94e.firebaseio.com/ingredients.json'=query)
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
  },[enteredFilter])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
