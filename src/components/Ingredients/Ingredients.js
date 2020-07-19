import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log('RENDERING INGREDIENTS.', ingredients)
  }, [ingredients]);

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://burger-builder-ed94e.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content_Type': 'application/JSON' }
    }).then(response => {
      setIsLoading(false);
      return response.json();
    }).then(responseData => {
      setIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient }
      ]);
    }).catch(err => {
      setIsLoading(false);
      setError('Something went wrong.',err.message);
    });
  }

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://burger-builder-ed94e.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    }).then(response => {
      setIsLoading(false);
      console.log('response=', response);
      setIngredients(prevIngredients => prevIngredients.filter(
        ingredientItem => (ingredientItem.id !== ingredientId)
      ));
    }).catch(err => {
      setIsLoading(false);
      setError('Something went wrong.',err.message);
    });
  }

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={(enteredIngredient) => addIngredientHandler(enteredIngredient)} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={(ingredientId) => removeIngredientHandler(ingredientId)} />
      </section>
    </div>
  );
}

export default Ingredients;
