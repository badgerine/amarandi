import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ingredient => ingredient.id !== action.id);
    default:
      throw new Error('Should not have an unknown action')
  }
}

const requestReducer = (requestState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'SUCCESSFUL':
      return { ...requestState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.error };
    case 'RESET':
      return { loading: false, error: null };
    default:
      throw new Error('Should not be reached!')
  }
}

let renderCounter = 0;
function Ingredients() {
  console.log('[Ingredients] renderCount=', ++renderCounter);
  const [ingredients, dispatchIngredient] = useReducer(ingredientReducer, []);
  const [requestState, dispatchRequest] = useReducer(requestReducer, { loading: false, error: null });

  useEffect(() => {
    console.log('[Ingredients.useEffect[ingredients]] update=', ingredients);
  }, [ingredients]);

  const addIngredientHandler = useCallback(ingredient => {
    dispatchRequest({ type: 'SEND' });
    fetch('https://burger-builder-ed94e.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content_Type': 'application/JSON' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      dispatchIngredient({
        type: 'ADD',
        ingredient: { id: responseData.name, ...ingredient }
      });
      dispatchRequest({ type: 'SUCCESSFUL' });
    }).catch(err => {
      dispatchRequest({ type: 'ERROR', error: 'Something went wrong. ' + err.message });
    });
  },[]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatchIngredient({
      type: 'SET',
      ingredients: filteredIngredients
    });
  }, []);

  const removeIngredientHandler = useCallback(ingredientId => {
    dispatchRequest({ type: 'SEND' });
    fetch(`https://burger-builder-ed94e.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    }).then(response => {
      dispatchRequest({ type: 'SUCCESSFUL' });
      console.log('response=', response);
      dispatchIngredient({
        type: 'DELETE',
        id: ingredientId
      });
    }).catch(err => {
      dispatchRequest({ type: 'ERROR', error: 'Something went wrong. ' + err.message });
    });
  },[]);

  const clearError = useCallback(() => {
    dispatchRequest({ type: 'RESET' });
  },[]);

  const ingredientList = useMemo(() => (
    <IngredientList ingredients={ingredients} onRemoveItem={(ingredientId) => removeIngredientHandler(ingredientId)} />
  ),[ingredients]);

  return (
    <div className="App">
      {requestState.error && <ErrorModal onClose={clearError}>{requestState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={(enteredIngredient) => addIngredientHandler(enteredIngredient)} loading={requestState.loading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
