import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { Formik, Form, Field } from 'formik';
import '../App.css';

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
            <Formik
                initialValues={{ name: '', gender: '', species: '' }}
                onSubmit={handleSearchSubmit}
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
            {noResults && (
                <div className="no-results-container">
                    <p>No se encontraron resultados</p>
                </div>
            )}
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
