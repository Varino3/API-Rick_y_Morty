import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Pagination from './Pagination';
import { Formik, Form, Field } from 'formik';

function Characters() {
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 4;
    const [speciesOptions, setSpeciesOptions] = useState([]);

    useEffect(() => {
        // Realiza una solicitud a la API para obtener todos los personajes
        axios.get('https://rickandmortyapi.com/api/character')
            .then((response) => {
                setFilteredCharacters(response.data.results);
            })
            .catch((error) => {
                console.error('Error de conexión', error);
            });

        // Realiza una solicitud para obtener las opciones de especie
        axios.get('https://rickandmortyapi.com/api/character')
            .then((speciesResponse) => {
                const speciesList = speciesResponse.data.results.map((character) => character.species);
                const uniqueSpecies = [...new Set(speciesList)];
                setSpeciesOptions([...uniqueSpecies]); // Agrega la opción vacía y especies únicas
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

                    // Realiza los filtros basados en los valores del formulario
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

                    // Actualiza el estado con los personajes filtrados
                    setFilteredCharacters(newFilteredCharacters);

                    // Reinicia la paginación
                    setCurrentPage(1);
                }}
            >
                {() => (
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
            <div className='padre'>
                {filteredCharacters.slice(offset, offset + charactersPerPage).map((character) => (
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
