import React, { useEffect } from 'react';

import './IngredientList.css';

let renderCounter = 0;
const IngredientList = props => {
  console.log('[IngredientList] renderCount=', ++renderCounter, 'ingredientCount=',props.ingredients.length);
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
           <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
