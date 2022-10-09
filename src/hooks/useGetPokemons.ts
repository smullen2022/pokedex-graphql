import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type pokeMinMax = {
  minimum: string;
  maximum: string;
}

export type BasePokemon = {
  id: string;
  number: string;
  name: string;
  types: string[];
  image: string;
}

export type Pokemon = BasePokemon & {  
  weight: pokeMinMax;
  height: pokeMinMax;
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: BasePokemon[] = useMemo(() => data?.pokemons || [], [data]);

  return {
    pokemons,
    ...queryRes,
  };
};

export const useGetPokemonDetails = (id?: string, name?: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      id,
      name,
    },
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || {}, [data]);

  return {
    pokemon,
    ...queryRes,
  };
};
