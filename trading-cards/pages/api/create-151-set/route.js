import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { importCSV } from './readCSV.js';

export async function GET(request) {
    try {
        const result = await sql`
            CREATE TABLE IF NOT EXISTS pokemon_151_set (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255),
                ungraded_price TEXT,
                image TEXT
            );
        `;

        const filePath = '/Users/nate/Desktop/trading card project/tradingcardsite/pokemon-151-ungraded.csv';
        const importResult = await importCSV(filePath);

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error('Error:', error); // Log the error details
        return NextResponse.json({ error }, { status: 500 });
    }
}