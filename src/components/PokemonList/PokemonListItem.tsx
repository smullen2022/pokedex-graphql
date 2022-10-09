import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { BasePokemon } from '../../hooks/useGetPokemons';
import { Separate } from '../common/Separate';

interface PokemonListItemProps {
  pokemon: BasePokemon;
}

export const PokemonListItem: React.FC<PokemonListItemProps> = ({ pokemon }) => {
  const location = useLocation();
  const classes = useStyles();
  const buttonStyles = {
    width: '100%',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#e8e8e8',
    }, 
  };

  return (
    <div className={`${classes.root} ${classes.container}`}>
      <div className={classes.container}>
        <img className={classes.img} src={pokemon.image} alt={pokemon.id} />
        <div className={classes.content}>
          <h3>#{pokemon.number} {pokemon.name}</h3>        
          <span className={classes.label}>Types: </span>
          <Separate content={pokemon.types} />
        </div>
      </div>   
      <Link className={classes.link} to={`/pokemon/${pokemon.name}/${pokemon.id}`} state={{ background: location }}>   
        <Button sx={buttonStyles}>More Details</Button> 
      </Link>
      <Outlet />                    
    </div>
  )
};

const useStyles = createUseStyles(
  {    
    root: {      
      width: '100%',
      justifyContent: 'space-between',
      borderRadius: '5px',
      border: '2px solid #fff',
      margin: '0 5px 10px 5px',
      transition: 'all 200ms ease',
      '&:hover': {
        margin: '-5px 0 5px 0',
        width: 'calc(100% + 10px)',
      },
      '&:hover $img': {        
        width: '130px',
      },
      '& h3': {
        marginTop: '0', 
        overflow: 'hidden',       
        textOverflow: 'ellipsis',
      }      
    },
    img: {
      width: '120px',
      transition: 'all 200ms ease',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      marginLeft: '20px',
      overflow: 'hidden',
    },
    label: {
      fontWeight: '900',      
    },
    link: {
      margin: '0 20px',
      textDecoration: 'none',
    },
    [`@media (max-width: 768px)`]: {
      root: {
        flexFlow: 'column wrap',
      },
      container: {
        width: '100%',
      },
      link: {
        margin: '10px 0 0 0',
        backgroundColor: '#fff',
        width: '100%',
      },
    },
  },
  { name: 'PokemonListItem' }
);