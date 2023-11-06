import React from 'react';
import { Formik, Form, Field } from 'formik';

function FilterForm({ onSubmit, speciesOptions }) {
    return (
        <Formik
            initialValues={{ name: '', gender: '', species: '' }}
            onSubmit={onSubmit}
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
    );
}

export default FilterForm;
