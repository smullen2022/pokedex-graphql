import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { Pokemon, useGetPokemonDetails } from '../../hooks/useGetPokemons';

interface PokemonDetailsProps {
  name?: string;
  id?: string;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = ({ name, id }) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const { pokemon, loading } = useGetPokemonDetails(id, name);
    const [newPokemon, setNewPokemon] = useState<Pokemon>();
    const shouldOpen = !!(name && id) && !loading;
    const weakTo = newPokemon?.weaknesses?.join(', ');
    const resists = newPokemon?.resistant?.join(', ');

    // we're mainly doing this to ensure a smooth closing transition,
    // keeping the pokemon data present in the component state at times when it 
    // would otherwise be an empty object so that the fadeout closing dialog
    // animation looks nice when it runs
    useEffect(() => {
      if (pokemon && pokemon.name) {
        setNewPokemon(pokemon);
      }
    }, [pokemon]);

    const closeModal = () => {
      navigate('/pokemon');     
    };    
    
    return (      
      <Dialog
        open={shouldOpen}
        onClose={closeModal}
      >   
        <DialogTitle className={classes.title}>{newPokemon?.name}</DialogTitle>
          <DialogContent className={classes.content}>
            <img className={classes.img} src={newPokemon?.image} />
            <div className={classes.detailsContainer}>
              <div className={classes.detail}>
                <div className={classes.label}>Max HP:</div>
                {newPokemon?.maxHP}
              </div>
              <div className={classes.detail}>
                <div className={classes.label}>Classification:</div>
                {newPokemon?.classification}
              </div>
              <div className={classes.detail}>
                <div className={classes.label}>Weaknesses:</div>
                {weakTo}
              </div>
              <div className={classes.detail}>
                <div className={classes.label}>Resistant to:</div>
                {resists}
              </div>  
            </div>                  
          </DialogContent>                 
        <DialogActions className={classes.footer}>
          <Button onClick={closeModal}>Close</Button>          
        </DialogActions>
      </Dialog>
    );
};

const useStyles = createUseStyles(
  {
    content: {
      display: 'flex',
      flexFlow: 'row wrap',
      '& div': {
        color: '#000',
      },
      marginTop: '2rem',      
    },
    img: {
      width: 'calc(50% - 20px)',
      paddingRight: '20px',
    },
    detailsContainer: {
      width: '50%',
    },
    detail: {
      paddingBottom: '10px',
    },
    title: {
      color: '#fff',
      background: '#3168ad',
    },
    label: {
      fontWeight: '900',
    },
    footer: {
      margin: '1rem 1rem 0 1rem',
      padding: '1rem 0',
      borderTop: '2px solid #1f221f',
    },
    [`@media (max-width: 768px)`]: {
      content: {
        flexFlow: 'column wrap',
      },
      img: {
        width: '100%',
        maxHeight: '250px',
        padding: '0 0 20px 0',
      },
      detailsContainer: {
        width: '100%',
      },
    },
  },
  { name: 'PokemonDetails' }
);