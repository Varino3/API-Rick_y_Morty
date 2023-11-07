import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCharacters } from '../features/taskSlice';
import axios from 'axios';
// TODO: Guardar estado en REDUX 

function ApiData({ children }) {
  const [characters, setCharacters] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // Realiza la llamada a la API
    axios.get('https://rickandmortyapi.com/api/character')
      .then((response) => {
        dispatch(getCharacters(response.data.results));
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error('Error de conexión', error);
      });
  }, []);

  return children(characters);
}

export default ApiData;
