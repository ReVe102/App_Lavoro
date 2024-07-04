import { defineConfig } from 'vite'  //definire configurazione progetto
import react from '@vitejs/plugin-react'  //importare il plugin react per vite

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, 
  },
});


//In sintesi, questo file configura un progetto Vite per utilizzare React, 
//eseguendo il server di sviluppo sulla porta 5173 e aprendo automaticamente il browser quando il server viene avviato.