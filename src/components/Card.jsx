import React, { useState } from 'react';
import Characters from './Characters';
import ApiData from './ApiData'; // Importamos el nuevo componente

function Card() {
  const [currentPage] = useState(1);

  return (
    <ApiData>
      {(characters) => (
        <div>
          <Characters characters={characters} />
        </div>
      )}
    </ApiData>
  );
}

export default Card;
