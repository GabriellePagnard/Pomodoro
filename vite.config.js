import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Définit l'URL de base pour s'assurer que les chemins fonctionnent bien
  resolve: {
    alias: {
      '@': '/src', // Alias pour simplifier les imports
    },
  },
  build: {
    outDir: 'dist', // Dossier de sortie lors de la construction du projet
    assetsDir: 'assets', // Dossier où les assets seront stockés
  },
  server: {
    open: true, // Ouvre automatiquement le navigateur lors du démarrage du serveur
    port: 5173, // Définit le port par défaut du serveur
  },
});
