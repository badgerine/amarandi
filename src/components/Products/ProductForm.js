import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './ProductForm.css';

let renderCount = 0;
const ProductForm = React.memo(props => {
  console.log('[ProductForm] renderCount=', ++renderCount);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddProduct({ title, type, description, year, price })
  };

  return (
    <section className="product-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={title} onChange={event => setTitle(event.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="type">Type</label>
            <input type="text" id="type" value={type} onChange={event => {
              const enteredValue = event.target.value;
              setType(prevType => {
                return enteredValue;
              })
            }} />
          </div>
          <div className="form-control">
            <label htmlFor="type">Description</label>
            <input type="text" id="description" value={description} onChange={event => {
              const enteredValue = event.target.value;
              setDescription(prevDescription => {
                return enteredValue;
              })
            }} />
          </div>
          <div className="form-control">
            <label htmlFor="year">Year</label>
            <input type="text" id="year" value={year} onChange={event => {
              const enteredValue = event.target.value;
              setYear(prevYear => {
                return enteredValue;
              })
            }} />
          </div>
          <div className="form-control">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" value={price} onChange={event => {
              const enteredValue = event.target.value;
              setPrice(prevPrice => {
                console.log('[App.return] react avails previous state, investigate: prevPrice=', prevPrice);
                console.log('[App.return] event.target.value=', enteredValue);
                return enteredValue;
              })
            }} />
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
