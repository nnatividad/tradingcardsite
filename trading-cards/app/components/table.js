import React, { useState, useEffect } from 'react';
import './table.css';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Ungraded',
        selector: row => row.ungraded_price,
    },
];

export default function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/create-151-set')
            .then(response => response.json())
            .then(data => setData(data.pokemonInfo))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <DataTable
            columns={columns}
            data={data}
            noHeader
        />
    );
};