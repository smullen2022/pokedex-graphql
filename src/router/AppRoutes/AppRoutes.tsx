import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home, ListPage } from "../../screens";

export const AppRoutes = () => {
  return(
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<ListPage />} />
        <Route path="/pokemon/:name/:id" element={<ListPage />} />                      
      </Routes>   
    </>
  );
}