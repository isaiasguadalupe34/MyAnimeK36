import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]); // NUEVO

  const addFavorite = (photo) => {
    setFavorites(prev => {
      if (prev.find(item => item.id === photo.id)) {
        return prev;
      }
      return [...prev, photo];
    });
  };

  const removeFavorite = (photoId) => {
    setFavorites(prev => prev.filter(item => item.id !== photoId));
  };

  const isFavorite = (photoId) => {
    return favorites.some(item => item.id === photoId);
  };

  const toggleFavorite = (photo) => {
    if (isFavorite(photo.id)) {
      removeFavorite(photo.id);
    } else {
      addFavorite(photo);
    }
  };

  // NUEVO: Agregar foto subida
  const addUploadedPhoto = (photo) => {
    console.log('Agregando foto a contexto:', photo);
    setUploadedPhotos(prev => [photo, ...prev]); // Agregar al inicio
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addFavorite, 
        removeFavorite, 
        isFavorite, 
        toggleFavorite,
        uploadedPhotos, // NUEVO
        addUploadedPhoto // NUEVO
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};