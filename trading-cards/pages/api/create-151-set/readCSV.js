import Papa from 'papaparse';
import fs from 'fs';
import {sql} from '@vercel/postgres';

export async function importCSV(filePath){
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err){
                return reject(err);
            }

            Papa.parse(data, {
                header: true,
                complete: async (results) => {
                    try{
                        for(const row of results.data){
                            await sql`
                                INSERT INTO pokemon_151_set (
                                    id,
                                    name,
                                    ungraded_price,
                                    image
                                ) VALUES (
                                    ${row.id},
                                    ${row.name},
                                    ${row.ungraded_price},
                                    ${row.image}
                                );
                            `;
                        }
                    } catch(error){
                        return reject(error);
                    }
                },
                error: (error) => {
                    return reject(error);
                }
            })
        })
    })
}