import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Pagination from './Pagination';
import { Formik, Form, Field } from 'formik';

function Characters() {
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // Personajes por página (filtrados)
    const charactersPerPage = 4;
    const [speciesOptions, setSpeciesOptions] = useState([]);

    useEffect(() => {
        // Conexión con la API (obtener todos personajes)
        axios.get('https://rickandmortyapi.com/api/character')
            .then((response) => {
                setFilteredCharacters(response.data.results);
            })
            .catch((error) => {
                console.error('Error de conexión', error);
            });

        // Conexión con la API (obtener las especies)
        axios.get('https://rickandmortyapi.com/api/character')
            .then((speciesResponse) => {
                const speciesList = speciesResponse.data.results.map((character) => character.species);
                const uniqueSpecies = [...new Set(speciesList)];
                // Agrega las especies únicas
                setSpeciesOptions([...uniqueSpecies]);
            })
            .catch((error) => {
                console.error('Error al obtener las opciones de especie', error);
            });
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const offset = (currentPage - 1) * charactersPerPage;

    return (
        <>
            <h1>Personajes de Rick&Morty</h1>
            <Formik
                initialValues={{ name: '', gender: '', species: '' }}
                onSubmit={(values) => {
                    let newFilteredCharacters = filteredCharacters;

                    // Realiza los filtros en función de los valores del formulario introducidos por el usuario
                    // Filtro por nombre
                    if (values.name) {
                        newFilteredCharacters = newFilteredCharacters.filter((character) =>
                            character.name.toLowerCase().includes(values.name.toLowerCase())
                        );
                    }

                    // Filtro por género
                    if (values.gender) {
                        newFilteredCharacters = newFilteredCharacters.filter((character) =>
                            character.gender === values.gender
                        );
                    }

                    // Filtro por especies
                    if (values.species) {
                        newFilteredCharacters = newFilteredCharacters.filter((character) =>
                            character.species === values.species
                        );
                    }

                    // Actualiza el estado únicamente con los personajes filtrados
                    setFilteredCharacters(newFilteredCharacters);

                    // Resetea la paginación
                    setCurrentPage(1);
                }}
            >
                {() => (
                    // Aquí se muestra el formulario como tal
                    <Form>
                        <div className="filtro">
                            <h2>Formulario de filtros</h2>
                            <Field type="text" name="name" placeholder="Filtrar por nombre" />
                            <Field as="select" name="gender">
                                <option value="">Filtrar por género</option>
                                <option value="Male">Masculino</option>
                                <option value="Female">Femenino</option>
                            </Field>
                            <Field as="select" name="species">
                                <option value="">Filtrar por especie</option>
                                {speciesOptions.map((species) => (
                                    <option key={species} value={species}>
                                        {species}
                                    </option>
                                ))}
                            </Field>
                            <button type="submit">Buscar</button>
                        </div>
                    </Form>
                )}
            </Formik>
            {/* Carta con la información de cada personaje */}
            <div className='padre'>
                {filteredCharacters.slice(offset, offset + charactersPerPage).map((character) => (
                    <div key={character.id} className='contenedor'>
                        <h2>{character.id}. {character.name}</h2>
                        <div className='carta'>
                            {/* Condicional para saber si está vivo a muerto */}
                            <div className={`status-circulo ${character.status === 'Alive' ? 'vivo' : 'muerto'}`}></div>
                            <img src={character.image} alt={character.name} />
                            <p>Nombre: {character.name}</p>
                            <p>Localización: {character.location.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* Muestra la paginación teniendo en cuenta los filtros */}
            <Pagination pageCount={Math.ceil(filteredCharacters.length / charactersPerPage)} handlePageClick={handlePageClick} />
        </>
    );
}

export default Characters;
