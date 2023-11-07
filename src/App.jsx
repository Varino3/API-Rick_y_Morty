import React, { useState } from 'react';
import Card from './components/Card';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

// Mostrar APP por pantalla
function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const state = useSelector(st => st);
  console.log('ESTADO', state);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div>
      {/* Botón para cambiar el tema */}
      <button onClick={toggleTheme}><FontAwesomeIcon icon={faSun} /> / <FontAwesomeIcon icon={faMoon} /></button>
      <link
        rel="stylesheet"
        type="text/css"
        href={
          isDarkTheme
            ? 'https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css' // Tema oscuro
            : 'https://cdn.jsdelivr.net/npm/water.css@2/out/light.css' // Tema claro
        }
      />
      {/* Muestra los personajes necesarios */}
      <div className="App">
        <Card />
      </div>
    </div>
  );
}

export default App;

