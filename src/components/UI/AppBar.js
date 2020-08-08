import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

let renderCount = 0;
export default React.memo(props => {
  const classes = useStyles();
  const { onLoadProducts } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  //executes after every re/render cycle of this cycle | 
  //[] only rerun when changes are detected on the properties listed in the array => effectively componentDidMount().
  useEffect(() => {
    console.log('[Search.useEffect[enteredFilter, inputRef]] update=', enteredFilter,inputRef);
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch('https://burger-builder-ed94e.firebaseio.com/products.json' + query)
          .then(response => {
            return response.json();
          }).then(responseJSObject => {
            console.log('responseJSObject=', responseJSObject);
            const loadedProducts = [];
            for (let key in responseJSObject) {
              loadedProducts.push({
                id: key,
                ...responseJSObject[key]
              });
            }
            // setProducts(loadedProducts.filter(product => (product.amount != null)));
            onLoadProducts(loadedProducts.filter(product => (product.amount != null)));
          });
      }
    }, 800);
    return () => {
      clearTimeout(timer);
    }; //useEffect returns a function, we will use this to clean up the timer in setTimeout(). I.e. a timer is created for every key stroke.
  }, [enteredFilter, onLoadProducts, inputRef]);


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Amarandi
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              inputRef={inputRef} 
              type="text" 
              value={enteredFilter} 
              onChange={event => setEnteredFilter(event.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
})
