import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { Formik, Form, Field } from 'formik';
import '../App.css';

function Characters({ characters }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [charactersPerPage] = useState(4);
    const [filteredCharacters, setFilteredCharacters] = useState(characters);
    const [speciesOptions, setSpeciesOptions] = useState([]); // Define speciesOptions

    useEffect(() => {
        // Restablecer los personajes filtrados cuando cambia la lista de personajes
        setFilteredCharacters(characters);

        // Obtener las opciones de especies de los personajes
        const uniqueSpecies = [...new Set(characters.map((character) => character.species))];
        setSpeciesOptions(uniqueSpecies);
    }, [characters]);

    const handlePageClick = ({ selected }) => {
        // Actualizar la página actual
        setCurrentPage(selected + 1);
    };

    const offset = (currentPage - 1) * charactersPerPage;

    return (
        <>
            <h1>Personajes de Rick&Morty</h1>
            <Formik
                initialValues={{ name: '', gender: '', species: '' }}
                onSubmit={(values) => {
                    let newFilteredCharacters = characters;

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

                    // Filtro por especie
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
            <div className="padre">
                {filteredCharacters.slice(offset, offset + charactersPerPage).map((character) => (
                    <div key={character.id} className="contenedor">
                        <h2>
                            {character.id}. {character.name}
                        </h2>
                        <div className="carta">
                            {/* Condicional para saber si está vivo o muerto */}
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
