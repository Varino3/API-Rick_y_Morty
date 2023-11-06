import { useState, useEffect } from 'react';
import axios from 'axios';
// TODO: Guardar estado en REDUX 

function ApiData({ children }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Realiza la llamada a la API
    axios.get('https://rickandmortyapi.com/api/character')
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error('Error de conexión', error);
      });
  }, []);

  return children(characters);
}

export default ApiData;
