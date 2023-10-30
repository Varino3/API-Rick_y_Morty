import React, { useState } from 'react';
import Card from './components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

// Mostrar APP por pantalla
function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div>
      <button onClick={toggleTheme}><FontAwesomeIcon icon={faSun} /> / <FontAwesomeIcon icon={faMoon} /></button>
      <link
        rel="stylesheet"
        type="text/css"
        href={
          isDarkTheme
            ? 'https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css'
            : 'https://cdn.jsdelivr.net/npm/water.css@2/out/light.css'
        }
      />
      <div className="App">
        <Card />
      </div>
    </div>
  );
}

export default App;