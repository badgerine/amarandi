import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import useRequest from '../../hooks/request';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import LoadingIndicator from '../UI/LoadingIndicator';

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

let renderCounter = 0;
function Ingredients() {
  console.log('[Ingredients] renderCount=', ++renderCounter);
  const [ingredients, dispatchIngredient] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, sendRequest, requestExtra } = useRequest();

  useEffect(() => {
    if(data !== null){
      dispatchIngredient({type: 'ADD', ingredient: { id: data.name, ...data }})
    }
  }, [data]);

  useEffect(() => {
    dispatchIngredient({ type: 'DELETE', id: requestExtra })
  }, [requestExtra]);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest('https://burger-builder-ed94e.firebaseio.com/ingredients.json',
    'POST',
    JSON.stringify(ingredient));

    // dispatchRequest({ type: 'SEND' });
    // fetch('https://burger-builder-ed94e.firebaseio.com/ingredients.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: { 'Content_Type': 'application/JSON' }
    // }).then(response => {
    //   return response.json();
    // }).then(responseData => {
    //   dispatchIngredient({
    //     type: 'ADD',
    //     ingredient: { id: responseData.name, ...ingredient }
    //   });
    //   dispatchRequest({ type: 'SUCCESSFUL' });
    // }).catch(err => {
    //   dispatchRequest({ type: 'ERROR', error: 'Something went wrong. ' + err.message });
    // });
  }, []);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatchIngredient({
      type: 'SET',
      ingredients: filteredIngredients
    });
  }, []);

  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`https://burger-builder-ed94e.firebaseio.com/ingredients/${ingredientId}.json`,
      'DELETE',
      null,
      ingredientId);

    // dispatchRequest({ type: 'SEND' });
    // fetch(`https://burger-builder-ed94e.firebaseio.com/ingredients/${ingredientId}.json`, {
    //   method: 'DELETE',
    // }).then(response => {
    //   dispatchRequest({ type: 'SUCCESSFUL' });
    //   console.log('response=', response);
    //   dispatchIngredient({
    //     type: 'DELETE',
    //     id: ingredientId
    //   });
    // }).catch(err => {
    //   dispatchRequest({ type: 'ERROR', error: 'Something went wrong. ' + err.message });
    // });
  }, [sendRequest]);

  const clearError = useCallback(() => {
    // dispatchRequest({ type: 'RESET' });
  }, []);

  const ingredientList = useMemo(() => (
    <IngredientList ingredients={ingredients} onRemoveItem={(ingredientId) => removeIngredientHandler(ingredientId)} />
  ), [ingredients]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={(enteredIngredient) => addIngredientHandler(enteredIngredient)} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
