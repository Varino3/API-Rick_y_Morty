import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Pagination from './Pagination';

function Characters() {
    const [nameFilter, setNameFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 4;

    useEffect(() => {
        // Realiza una solicitud a la API para obtener todos los personajes y opciones de especie
        axios.get('https://rickandmortyapi.com/api/character')
            .then((response) => {
                // Obtén la lista de especies únicas de tus personajes
                const uniqueSpecies = [...new Set(response.data.results.map((character) => character.species))];
                setSpeciesOptions(uniqueSpecies);

                // Filtra los personajes iniciales
                setFilteredCharacters(response.data.results);
            })
            .catch((error) => {
                console.error('Error de conexión', error);
            });
    }, []);

    const filterCharacters = () => {
        const newFilteredCharacters = filteredCharacters
            .filter((character) => character.name.toLowerCase().includes(nameFilter.toLowerCase()))
            .filter((character) => genderFilter === '' || character.gender === genderFilter)
            .filter((character) => speciesFilter === '' || character.species === speciesFilter);
        setFilteredCharacters(newFilteredCharacters);
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const offset = (currentPage - 1) * charactersPerPage;
    const currentCharacters = filteredCharacters.slice(offset, offset + charactersPerPage);

    return (
        <>
            <h1>Personajes de Rick&Morty</h1>
            <div className="filtro">
                <h2>Formulario de filtros</h2>
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                    <option value="">Filtrar por género</option>
                    <option value="Male">Masculino</option>
                    <option value="Female">Femenino</option>
                    <option value="unknown">Desconocido</option>
                </select>
                <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
                    <option value="">Filtrar por especie</option>
                    {speciesOptions.map((species) => (
                        <option key={species} value={species}>
                            {species}
                        </option>
                    ))}
                </select>
                <button onClick={filterCharacters}>Buscar</button>
            </div>
            <div className='padre'>
                {currentCharacters.map((character) => (
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
            <Pagination pageCount={Math.ceil(filteredCharacters.length / charactersPerPage)} handlePageClick={handlePageClick} />
        </>
    );
}

export default Characters;
