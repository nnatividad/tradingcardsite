import React, { useState, useEffect, useMemo } from 'react';
import './table.css';

export default function Table(props) {
    const {cards} = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/create-151-set')
            .then(response => response.json())
            .then(data => setData(data.pokemonInfo))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const itemsPerPage = 25;
    const [page, setPage] = useState(1);
    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [data,page]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div id = "container">
            <table className="table">
            <thead>
                <tr>
                    <th>Card</th>
                    <th>Name</th>
                    <th>Ungraded Price</th>
                    <th>Grade Nine</th>
                    <th>PSA Ten</th>
                </tr>
            </thead>
            <tbody>
                {displayData.map((pokemon) => (
                    <tr key={pokemon.id}>
                        <td><a><img src={pokemon.image} alt={pokemon.name} /></a></td>
                        <td>{pokemon.name}</td>
                        <td>{pokemon.ungraded_price}</td>
                        <td>{pokemon.grade_nine}</td>
                        <td>{pokemon.psa_ten}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="pagination">
            <button onClick={() => setPage(page - 1)}disabled={page === 1}> Prev Page </button>
            <button onClick={() => setPage(page + 1)}disabled={page === totalPages}> Next Page </button>
        </div>
        </div>
    );
};