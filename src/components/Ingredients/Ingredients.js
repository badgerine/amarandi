import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    setIngredients(prevIngredients => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient }
    ]);
  }

  const removeIngredient = ingredientId => {
    setIngredients(prevIngredients => prevIngredients.filter(
      ingredientItem => (ingredientItem.id !== ingredientId)
    ));
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={(enteredIngredient) => addIngredientHandler(enteredIngredient)}/>

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={(ingredientId) => removeIngredient(ingredientId)} />
      </section>
    </div>
  );
}

export default Ingredients;
