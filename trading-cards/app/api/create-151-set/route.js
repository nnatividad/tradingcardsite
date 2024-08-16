import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { importCSV } from './readCSV.js';

export async function POST(request) { // Use POST for data creation and import
    try {
        // Create the table if it does not exist
        await sql`
            CREATE TABLE IF NOT EXISTS pokemon_151_set (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255),
                ungraded_price TEXT,
                image TEXT
            );
        `;

        // Import data from CSV
        const filePath = '/Users/nate/Desktop/trading card project/tradingcardsite/pokemon-151-ungraded.csv';
        const importResult = await importCSV(filePath);

        return NextResponse.json({ message: 'Table created and data imported successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to create table or import data' }, { status: 500 });
    }
}


export async function GET(req) {
    try {
        const query = await sql`SELECT * FROM pokemon_151_set;`;
        const pokemonInfo = query.rows;
        return NextResponse.json({ pokemonInfo }, { status: 200 });
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return NextResponse.json({ error: 'Failed to fetch Pokémon data' }, { status: 500 });
    }
}