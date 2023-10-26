import React from 'react';
import '../App.css';

function Characters({ characters }) {
    return (
        <>
            <h1>Personajes de Rick&Morty</h1>
            <div className='padre'>
                {characters.map((character) => (
                    <div key={character.id} className='contenedor'>
                        <h2>{character.id}. {character.name}</h2>
                        <div className='carta'>
                            <div className={`status-circulo ${character.status === 'Alive' ? 'vivo' : 'muerto'}`}></div>
                            <img src={character.image} alt={character.name} />
                            <p>Nombre: {character.name}</p>
                            <p>Localización: {character.location.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Characters;
