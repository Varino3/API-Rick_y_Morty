import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import FilterForm from './FilterForm';
import '../App.css';
import ExportToExcelButton from './ExportToExcelButton';

function Characters({ characters }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [charactersPerPage] = useState(4);
    const [filteredCharacters, setFilteredCharacters] = useState(characters);
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [noResults, setNoResults] = useState(false); // Estado para indicar si no se encontraron resultados

    useEffect(() => {
        setFilteredCharacters(characters);

        const uniqueSpecies = [...new Set(characters.map((character) => character.species))];
        setSpeciesOptions(uniqueSpecies);
    }, [characters]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const offset = (currentPage - 1) * charactersPerPage;

    const handleSearchSubmit = (values) => {
        let newFilteredCharacters = characters;

        if (values.name) {
            newFilteredCharacters = newFilteredCharacters.filter((character) =>
                character.name.toLowerCase().includes(values.name.toLowerCase())
            );
        }

        if (values.gender) {
            newFilteredCharacters = newFilteredCharacters.filter((character) =>
                character.gender === values.gender
            );
        }

        if (values.species) {
            newFilteredCharacters = newFilteredCharacters.filter((character) =>
                character.species === values.species
            );
        }

        setFilteredCharacters(newFilteredCharacters);

        // Verificar si no se encontraron resultados
        if (newFilteredCharacters.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }

        setCurrentPage(1);
    };

    return (
        <div className="characters-container">
            <h1>Personajes de Rick&Morty</h1>
            <FilterForm onSubmit={handleSearchSubmit} speciesOptions={speciesOptions} />
            {noResults && (
                <div className="no-results-container">
                    <p>No se encontraron resultados</p>
                </div>
            )}

            <ExportToExcelButton characters={filteredCharacters} />

            <div className="padre">
                {filteredCharacters.slice(offset, offset + charactersPerPage).map((character) => (
                    <div key={character.id} className='contenedor'>
                        <h2>
                            {character.id}. {character.name}
                        </h2>
                        <div className="carta">
                            <div className={`status-circulo ${character.status === 'Alive' ? 'vivo' : 'muerto'}`}></div>
                            <img src={character.image} alt={character.name} />
                            <p>Nombre: {character.name}</p>
                            <p>Localización: {character.location.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination pageCount={Math.ceil(filteredCharacters.length / charactersPerPage)} handlePageClick={handlePageClick} />
        </div>
    );
}

export default Characters;
