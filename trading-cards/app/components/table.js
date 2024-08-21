import React, { useState, useEffect } from 'react';
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

    return (
        <div id = "container">
            <table className="table">
            <thead>
                <tr>
                    <th>Card</th>
                    <th>Name</th>
                    <th>Ungraded Price</th>
                </tr>
            </thead>
            <tbody>
                {data.map((pokemon) => (
                    <tr key={pokemon.id}>
                        <td><a><img src={pokemon.image} alt={pokemon.name} /></a></td>
                        <td>{pokemon.name}</td>
                        <td>{pokemon.ungraded_price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};