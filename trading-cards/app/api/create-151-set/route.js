import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { importCSV } from './readCSV.js';

export async function POST(request) {
    try {
        console.log('Attempting to drop table...');
        await sql`DROP TABLE IF EXISTS pokemon_151_set;`;
        console.log('Table dropped or did not exist.');

        console.log('Attempting to create table...');
        await sql`
            CREATE TABLE IF NOT EXISTS pokemon_151_set (
                id VARCHAR(255) PRIMARY KEY,
                image TEXT,
                name VARCHAR(255),
                ungraded_price TEXT,
                grade_nine TEXT,
                psa_ten TEXT
            );
        `;
        console.log('Table created or already exists.');

        const filePath = '/Users/nate/Desktop/trading card project/tradingcardsite/pokemon151.csv';
        console.log('Starting CSV import...');
        const importResult = await importCSV(filePath);
        console.log('CSV import complete.');

        return NextResponse.json({ message: 'Table created and data imported successfully.' }, { status: 200 });
    } catch (error) {
        console.error('Error during POST request:', error);
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