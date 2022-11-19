import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { BasePokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import TextField from '@mui/material/TextField';
import { PokemonListItem } from './PokemonListItem';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [pokemonList, setPokemonList] = useState<BasePokemon[]>();
  const inputStyle = {
    width: '100%',
    '& .MuiInputBase-root': {
      overflow: 'hidden',
      border: '2px solid #21201c',
    },
    '& input': {
      backgroundColor: '#fff',
    },
    '& fieldset': {
      border: '0',
      outline: '0',
    }         
  };

  useEffect(() => setPokemonList(pokemons), [pokemons]);

  const filterPokemons = (value: string) => {
    const newList = pokemons.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
    setPokemonList(newList);
  }

  return (
    <>
      <img className={classes.banner} src="/pokebanner.jpg" />
      <div className={classes.root}>
        <div className={classes.listContainer}>
          <div className={classes.search}>
            <TextField 
              id="outlined-search" 
              placeholder="Refine list by name" 
              type="search"
              sx={inputStyle}
              onChange={(e) => filterPokemons(e.target.value)}
            />
          </div>        
          {loading && <div>Loading...</div>}
          {pokemonList?.map((pkmn) => <PokemonListItem pokemon={pkmn} key={pkmn.id} />)}
        </div>     
      </div>
    </>
  ); 
};

const useStyles = createUseStyles(
  {
    banner: {
      height: '200px',
      width: '100%',
      objectFit: 'cover',
      objectPosition: 'top',
      position: 'fixed',
      zIndex: '1',
      top: '0',
      boxShadow: '2px 2px 4px rgb(0 0 0 / 30%)',
    },
    root: {
      display: 'flex',
      flexFlow: 'column wrap',
      padding: '2rem',
      marginTop: '200px',
      alignItems: 'center',
    },
    search: {
      marginBottom: '2rem',
    },
    listContainer: {
      maxWidth: '1000px',
      width: '100%',
    }
  },
  { name: 'PokemonList' }
);
