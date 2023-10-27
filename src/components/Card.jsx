import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Characters from './Characters';
import Pagination from './Pagination';

function Card() {
    const [characters, setCharacters] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const charactersPerPage = 4; // Personajes por página

    useEffect(() => {
        // Conexión GET con la API
        axios.get('https://rickandmortyapi.com/api/character')
            .then((response) => {
                setCharacters(response.data.results);
            })
            .catch((error) => {
                console.error('Error de conexión', error);
            });
    }, []);

    const pageCount = Math.ceil(characters.length / charactersPerPage);
    const offset = pageNumber * charactersPerPage;
    const currentCharacters = characters.slice(offset, offset + charactersPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <Characters characters={currentCharacters} />
            <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
        </div>
    );
}

export default Card;
