import React from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonList } from '../components';

export const ListPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PokemonList />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: 'calc(100% - 2rem)',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
