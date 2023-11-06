import React from 'react';
import XLSX from 'xlsx';

function ExportToExcelButton({ characters }) {
    const handleExportClick = () => {
        // Crear un objeto de datos con los personajes
        const data = characters.map((character) => ({
            Name: character.name,
            Species: character.species,
            Gender: character.gender,
            Status: character.status,
            Location: character.location.name,
        }));

        // Crear una hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(data);

        // Crear un libro de trabajo y agregar la hoja de cálculo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Personajes');

        // Descargar el archivo Excel
        XLSX.writeFile(wb, 'RickAndMortyCharacters.xlsx');
    };

    return (
        <div>
            <button onClick={handleExportClick}>Exportar a Excel</button>
        </div>
    );
}

export default ExportToExcelButton;