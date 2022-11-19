import React from 'react';
import { useParams } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { PokemonDetails, PokemonList } from '../components';

export const ListPage = () => {
  const classes = useStyles();  
  const { name, id } = useParams();

  return (
    <div className={classes.root}>
      <PokemonList />
      <PokemonDetails name={name} id={id} />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
