import React, { useState, useEffect, useMemo } from 'react';
import './table.css';


export default function Table() {
    //const {cards} = props;
    const [data, setData] = useState([]); //useState hook to store data from fetch request
    //data array of values from fetch request, setData function to update data
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState(' '); //set as empty string (no filters when first rendered)
    const itemsPerPage = 25;

    useEffect(() => {
        fetch('/api/create-151-set')
            .then(response => response.json())
            .then(data => setData(data.pokemonInfo))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const displayData = useMemo(() => {//useMemo hook used to control how many cards show per page
        if (!data || !Array.isArray(data)) return [];
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    }, [data,page]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    function filterData(filter){//function to filter data based on filter value
        let sortedData = [...data]; //copy of data array
        if(filter === 'name'){
            sortedData.sort((a,b) => { //extra null value is caused by null values from other values
               let nameA;
               let nameB;
               if(a.name){
                    nameA = a.name.toString();
               }else{
                     nameA = '';
               }
                if(b.name){
                      nameB = b.name.toString();
                }else{
                        nameB = '';
                }
                return nameA.localeCompare(nameB);
            });
        }else if(filter === 'high-to-low'){//descending order
            sortedData.sort((a,b) => {
                let priceA;
                let priceB;
                if(a.ungraded_price){
                    priceA = parseFloat(a.ungraded_price.replace('$', '')); //remove dollar sign
                }
                if(b.ungraded_price){
                    priceB = parseFloat(b.ungraded_price.replace('$', ''));
                }
                return priceB - priceA;
            })
        }else if (filter === 'low-to-high'){//ascending order
            sortedData.sort((a,b) => {
                let priceA;
                let priceB;
                if(a.ungraded_price){
                    priceA = parseFloat(a.ungraded_price.replace('$', ''));
                }
                if(b.ungraded_price){
                    priceB = parseFloat(b.ungraded_price.replace('$', ''));
                }
                return priceA - priceB;
            })
        }
        sortedData = sortedData.filter(item => item !== null && item !== undefined);
        setData(sortedData);
    }

    const onChange = (event) => { //event handler function for tracking filter changes
        const value = event.target.value;
        console.log(value);
        setFilter(value);
        filterData(value);
    };

    return (
        <div id = "container">
            <div className = "filter-container">
                <div className = "drop-down-container">
                    <label htmlFor ="filters">Filter:</label>
                    <select id="filters" onChange={onChange}>
                    <option value='name'>Name: A-Z</option>
                    <option value='high-to-low'>Price: High to Low</option>
                    <option value='low-to-high'>Price: Low to High</option>
                    </select>
                </div>
            </div>
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