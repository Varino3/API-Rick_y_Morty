import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Characters from './Characters';

function Card() {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 4;

    useEffect(() => {
        // Realiza una solicitud GET a la API para obtener todos los personajes
        axios.get('https://rickandmortyapi.com/api/character')
            .then((response) => {
                setCharacters(response.data.results);
            })
            .catch((error) => {
                console.error('Error de conexión', error);
            });
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const offset = (currentPage - 1) * charactersPerPage;
    const currentCharacters = characters.slice(offset, offset + charactersPerPage);

    return (
        <div>
            <Characters characters={currentCharacters} />
        </div>
    );
}

export default Card;
