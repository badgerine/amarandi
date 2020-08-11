import React, { useState, useRef } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './ProductForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  productForm: {
    width: '40rem',
    margin: '2rem auto',
    maxWidth: '80%',
  },
  label: {
    display: 'block',
    width: '100%',
  },
  input: {
    display: 'flex',
    width: '100%',
    font: 'inherit',
    padding: '0.1rem 0.25rem',
    border: 'none',
    borderBottom: '2px solid #ccc',
    marginBottom: '1rem',
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    textAlign: 'center',
    margin: 'auto'
  },
  img: {
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const UploadButton = <Button>Click to Upload</Button>;

let renderCount = 0;
const ProductForm = React.memo(props => {
  const classes = useStyles();
  console.log('[ProductForm] renderCount=', ++renderCount);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageAsObjectUrl, setImageAsObjectUrl] = useState(null);
  const hiddenFileInput = useRef();

  const submitHandler = event => {
    event.preventDefault();
    props.onAddProduct({ title, type, description, year, price })
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  }

  const handleFile = (event) => {
    const file = event.target.files[0];
    setImageAsObjectUrl(URL.createObjectURL(file));
    setImageFile(file);
  }

  return (
    <section className={classes.productForm}>
      <Card>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs='6'>
              <label className={classes.label} htmlFor="title">Name</label>
              <input className={classes.input} type="text" id="title" value={title} onChange={event => setTitle(event.target.value)} />
              <label className={classes.label} htmlFor="type">Type</label>
              <input className={classes.input} type="text" id="type" value={type} onChange={event => {
                const enteredValue = event.target.value;
                setType(prevType => {
                  return enteredValue;
                })
              }} />
              <label className={classes.label} htmlFor="type">Description</label>
              <input className={classes.input} type="text" id="description" value={description} onChange={event => {
                const enteredValue = event.target.value;
                setDescription(prevDescription => {
                  return enteredValue;
                })
              }} />
              <label className={classes.label} htmlFor="year">Year</label>
              <input className={classes.input} type="text" id="year" value={year} onChange={event => {
                const enteredValue = event.target.value;
                setYear(prevYear => {
                  return enteredValue;
                })
              }} />
              <label className={classes.label} htmlFor="price">Price</label>
              <input className={classes.input} type="number" id="price" value={price} onChange={event => {
                const enteredValue = event.target.value;
                setPrice(prevPrice => {
                  console.log('[App.return] react avails previous state, investigate: prevPrice=', prevPrice);
                  console.log('[App.return] event.target.value=', enteredValue);
                  return enteredValue;
                })
              }} />
            </Grid>
            <Grid item xs='6'>
              <div className={classes.image}>
                <ButtonBase
                  className={classes.img}
                  onClick={handleClick}
                  // style={imageAsObjectUrl != null ? { width: '100%', height: '100%', backgroundImage: `url(${v})` } : null}
                >
                  {imageAsObjectUrl ?  <img style={{ maxHeight: '21rem', maxWidth: '100%'}} src={imageAsObjectUrl} alt="image visualisation"/> : 'Upload Product Image'}
                  <input ref={hiddenFileInput} type="file" onChange={handleFile} hidden />
                </ButtonBase>
              </div>
            </Grid>
          </Grid>
          <div className="product-form__actions">
            <button type="submit">Add Product</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default ProductForm;
