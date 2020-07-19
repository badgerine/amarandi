import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('https://burger-builder-ed94e.firebaseio.com/ingredients.json')
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
        setIngredients(loadedIngredients.filter(ingredient => (ingredient.amount != null)));
      });
  }, []);//executes after every re/render cycle of this cycle | [] only rerun when changes are detected on the properties here => effectively componentDidMount().

  useEffect(() => {
    console.log('RENDERING INGREDIENTS.',ingredients)
  },[ingredients])

  const addIngredientHandler = ingredient => {
    fetch('https://burger-builder-ed94e.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content_Type': 'application/JSON' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient }
      ]);
    });
  }

  const removeIngredient = ingredientId => {
    setIngredients(prevIngredients => prevIngredients.filter(
      ingredientItem => (ingredientItem.id !== ingredientId)
    ));
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={(enteredIngredient) => addIngredientHandler(enteredIngredient)} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={(ingredientId) => removeIngredient(ingredientId)} />
      </section>
    </div>
  );
}

export default Ingredients;
