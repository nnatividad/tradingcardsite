import Papa from 'papaparse';
import fs from 'fs';
import { sql } from '@vercel/postgres';

export async function importCSV(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }

            Papa.parse(data, {
                header: true,
                complete: async (results) => {
                    try {
                        for (const row of results.data) {
                            await sql`
                                INSERT INTO pokemon_151_set (
                                    id,
                                    image,
                                    name,
                                    ungraded_price,
                                    grade_nine,
                                    psa_ten
                                ) VALUES (
                                    ${row.id},
                                    ${row.image},
                                    ${row.name},
                                    ${row.ungraded_price},
                                    ${row.grade_nine},
                                    ${row.psa_ten}
                                )
                                ON CONFLICT (id) DO UPDATE
                                SET image = EXCLUDED.image,
                                    name = EXCLUDED.name,
                                    ungraded_price = EXCLUDED.ungraded_price,
                                    grade_nine = EXCLUDED.grade_nine,
                                    psa_ten = EXCLUDED.psa_ten;
                            `;
                        }
                        resolve(results.data);
                    } catch (error) {
                        reject(error);
                    }
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    });
}

