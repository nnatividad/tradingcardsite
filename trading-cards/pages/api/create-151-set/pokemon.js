// This file is responsible for fetching all the pokemon data from the database and returning it to the client
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const query = await sql`SELECT * FROM pokemon_151_set;`;
            const pokemonInfo = query.rows;
            res.status(200).json({ pokemonInfo });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            res.status(500).json({ error: 'Failed to fetch Pokémon data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
