import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import useRequest from '../../hooks/request';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import LoadingIndicator from '../UI/LoadingIndicator';

const productReducer = (currentProducts, action) => {
  switch (action.type) {
    case 'SET':
      return action.products;
    case 'ADD':
      return [...currentProducts, action.product];
    case 'DELETE':
      return currentProducts.filter(product => product.id !== action.id);
    default:
      throw new Error('Should not have an unknown action')
  }
}

let renderCounter = 0;
function Products() {
  console.log('[Products] renderCount=', ++renderCounter);
  const [products, dispatchProduct] = useReducer(productReducer, []);
  const { isLoading, error, data, sendRequest, requestExtra } = useRequest();

  useEffect(() => {
    if(data !== null){
      dispatchProduct({type: 'ADD', product: { id: data.name, ...data }})
    }
  }, [data]);

  useEffect(() => {
    dispatchProduct({ type: 'DELETE', id: requestExtra })
  }, [requestExtra]);

  const addProductHandler = useCallback(product => {
    sendRequest('https://burger-builder-ed94e.firebaseio.com/products.json',
    'POST',
    JSON.stringify(product));

    // dispatchRequest({ type: 'SEND' });
    // fetch('https://burger-builder-ed94e.firebaseio.com/products.json', {
    //   method: 'POST',
    //   body: JSON.stringify(product),
    //   headers: { 'Content_Type': 'application/JSON' }
    // }).then(response => {
    //   return response.json();
    // }).then(responseData => {
    //   dispatchProduct({
    //     type: 'ADD',
    //     product: { id: responseData.name, ...product }
    //   });
    //   dispatchRequest({ type: 'SUCCESSFUL' });
    // }).catch(err => {
    //   dispatchRequest({ type: 'ERROR', error: 'Something went wrong. ' + err.message });
    // });
  }, []);

  const filteredProductsHandler = useCallback(filteredProducts => {
    dispatchProduct({
      type: 'SET',
      products: filteredProducts
    });
  }, []);

  const removeProductHandler = useCallback(productId => {
    sendRequest(`https://burger-builder-ed94e.firebaseio.com/products/${productId}.json`,
      'DELETE',
      null,
      productId);

    // dispatchRequest({ type: 'SEND' });
    // fetch(`https://burger-builder-ed94e.firebaseio.com/products/${productId}.json`, {
    //   method: 'DELETE',
    // }).then(response => {
    //   dispatchRequest({ type: 'SUCCESSFUL' });
    //   console.log('response=', response);
    //   dispatchProduct({
    //     type: 'DELETE',
    //     id: productId
    //   });
    // }).catch(err => {
    //   dispatchRequest({ type: 'ERROR', error: 'Something went wrong. ' + err.message });
    // });
  }, [sendRequest]);

  const clearError = useCallback(() => {
    // dispatchRequest({ type: 'RESET' });
  }, []);

  const productList = useMemo(() => (
    <ProductList products={products} onRemoveItem={(productId) => removeProductHandler(productId)} />
  ), [products]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <ProductForm onAddProduct={(enteredProduct) => addProductHandler(enteredProduct)} />

      <section>
        <Search onLoadProducts={filteredProductsHandler} />
        {productList}
      </section>
    </div>
  );
}

export default Products;
