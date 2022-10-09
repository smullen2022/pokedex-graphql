import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonDetails } from '../../hooks/useGetPokemons';
import { Separate } from '../common/Separate';

export const PokemonDetails = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const { name, id } = useParams();
    const { pokemon, loading } = useGetPokemonDetails(id, name);    

    const closeModal = () => {
      navigate('/pokemon');
    };

    if (loading) {
      return <></>;
    }
    
    return(      
      <Dialog
        open
        onClose={closeModal}
      >        
        <DialogTitle className={classes.title}>{pokemon.name}</DialogTitle>
          <DialogContent className={classes.content}>
            <img className={classes.img} src={pokemon.image} />
            <div className={classes.detailsContainer}>
              <div className={classes.detail}>
                <div className={classes.label}>Max HP:</div>
                {pokemon.maxHP}
              </div>
              <div className={classes.detail}>
                <div className={classes.label}>Classification:</div>
                {pokemon.classification}
              </div>
              <div className={classes.detail}>
                <div className={classes.label}>Weaknesses:</div>
                <Separate content={pokemon.weaknesses} />
              </div>
              <div className={classes.detail}>
                <div className={classes.label}>Resistant to:</div>
                <Separate content={pokemon.resistant} />
              </div>  
            </div>                  
          </DialogContent>                 
        <DialogActions>
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
      }      
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
      color: '#000',
    },
    label: {
      fontWeight: '900',
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