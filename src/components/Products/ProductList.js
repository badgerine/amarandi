import React, { useEffect } from 'react';

import './ProductList.css';

let renderCounter = 0;
const ProductList = props => {
  console.log('[ProductList] renderCount=', ++renderCounter, 'productCount=',props.products.length);
  return (
    <section className="product-list">
      <h2>Loaded Products</h2>
      <ul>
        {props.products.map(prd => (
           <li key={prd.id} onClick={props.onRemoveItem.bind(this, prd.id)}>
            <span>{prd.title}</span>
            <span>{prd.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
