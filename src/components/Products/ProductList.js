import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import coverImage from '../../assets/placeholder.jpg';

import './ProductList.css';

const useStyles = makeStyles((theme) => {

  return ({
      heroContent: {
          // backgroundImage: `url(${BackgroundImage}`,
          // backgroundSize: 'cover',
          // height: 800,
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(5, 0, 4),
      },
      heroButtons: {
          marginTop: theme.spacing(2),
      },
      cardGrid: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(8),
      },
      card: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
      },
      cardMedia: {
          paddingTop: '56.25%', // 16:9
      },
      cardContent: {
          flexGrow: 1,
      },
  })
});



let renderCounter = 0;
const ProductList = props => {
  console.log('[ProductList] renderCount=', ++renderCounter, 'productCount=', props.products.length);
  const classes = useStyles();

  const productSelectedHandler = () => {

  }

  let productCards = null;
  if (props.products.length > 1) {
    productCards = props.products.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={coverImage}
                    title={product.title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.title}
                    </Typography>
                    <Typography>
                        {product.synopsis}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Info
                    </Button>
                    <Button size="small" color="primary" onClick={() => productSelectedHandler(product.id, product.mediaId)}>
                        Play
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    ))
}

  return (
    // <section className="product-list">
    //   <h2>Loaded Products</h2>
    //   <ul>
    //     {props.products.map(prd => (
    //       <li key={prd.id} onClick={props.onRemoveItem.bind(this, prd.id)}>
    //         <span>{prd.title}</span>
    //         <span>{prd.amount}x</span>
    //       </li>
    //     ))}
    //   </ul>
    // </section>

    <Container className={classes.cardGrid} maxWidth="lg">
      <h2>Loaded Products</h2>
      <Grid container spacing={4}>
        {productCards}
      </Grid>
    </Container>
  );
};

export default ProductList;
