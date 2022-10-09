import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Home, ListPage } from "../../screens";
import { PokemonDetails } from "../../components/PokemonDetails";

export const AppRoutes = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return(
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<ListPage />} />                     
      </Routes> 
      {background && (
        <Routes>
          <Route path="/pokemon/:name/:id" element={<PokemonDetails />} />
        </Routes>        
      )}     
    </>
  );
}