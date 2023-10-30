import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Characters from './Characters';

function Card() {
    const [characters, setCharacters] = useState([]);
    const [currentPage] = useState(1);
    // Personajes por página (todos)
    const charactersPerPage = 4;

    useEffect(() => {
        // Conexión (GET) con la API
        axios.get('https://rickandmortyapi.com/api/character')
            .then((response) => {
                setCharacters(response.data.results);
            })
            .catch((error) => {
                console.error('Error de conexión', error);
            });
    }, []);

    const offset = (currentPage - 1) * charactersPerPage;
    const currentCharacters = characters.slice(offset, offset + charactersPerPage);

    // Devuelve los personajes
    return (
        <div>
            <Characters characters={currentCharacters} />
        </div>
    );
}

export default Card;
