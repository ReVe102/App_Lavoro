import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <App/>
  
)


//•	document.getElementById('root'): Ottiene l’elemento DOM con l’ID ‘root’, che è un div nel file index.HTML principale dell’app.
//ReactDOM.createRoot(...).render(...): Crea una radice React nel nodo DOM specificato e renderizza il componente App al suo interno.

// Quindi, in sintesi, questo codice imposta la struttura di base per un’applicazione React. Importa le librerie necessarie, 
//importa il componente principale App, e quindi lo rende all’interno dell’elemento DOM con l’ID root.