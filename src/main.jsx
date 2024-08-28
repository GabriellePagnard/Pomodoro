import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';
import './index.css'; // Importation des styles globaux

/**
 * Sélectionne l'élément HTML avec l'ID 'root'.
 * Cet élément sert de conteneur principal pour l'application React.
 * @type {HTMLElement}
 */
const rootElement = document.getElementById('root');

/**
 * Initialise la racine de l'application en utilisant createRoot, 
 * qui est recommandé pour les applications React 18 et offre de meilleures performances et compatibilité.
 * @type {Root}
 */
const root = createRoot(rootElement);

/**
 * Rendu de l'application principale dans le conteneur root.
 * ChakraProvider est utilisé pour gérer les styles et les thèmes de l'application.
 */
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
