import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './ProductForm.css';

let renderCount = 0;
const ProductForm = React.memo(props => {
  console.log('[ProductForm] renderCount=',++renderCount);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddProduct({title, amount})
  };

  return (
    <section className="product-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={title} onChange={event => setTitle(event.target.value)}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount} onChange={event => {
              const enteredValue = event.target.value;
              setAmount(prevAmount => {
                console.log('[App.return] react avails previous state, investigate: prevAmount=',prevAmount);
                console.log('[App.return] event.target.value=', enteredValue);
                // return event.target.value;
                return enteredValue;
                })}}/>
          </div>
          <div className="product-form__actions">
            <button type="submit">Add Product</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default ProductForm;
