"use client"
// contexts/AssetContext.js
import React, { createContext, useContext } from 'react';

export const AssetContext = createContext();
export const useAsset = () => useContext(AssetContext);


export const AssetProvider = ({ value, children }) => (
  <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
);


