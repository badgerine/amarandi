import React, { useEffect } from 'react';

import './ProductList.css';

let renderCounter = 0;
const ProductList = props => {
  console.log('[ProductList] renderCount=', ++renderCounter, 'productCount=',props.products.length);
  return (
    <section className="product-list">
      <h2>Loaded Products</h2>
      <ul>
        {props.products.map(ig => (
           <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
