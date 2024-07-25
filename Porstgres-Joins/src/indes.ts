import {Client} from 'pg';

const client = new Client({
    connectionString:"postgresql://postgres:mysecretpassword@localhost/postgres",
});

async function insertnewTable(username:string,password:string,email:string){
    await client.connect();
    const result = await client.query(`
    INSERT INTO users (username,password,email)
    VALUES($1,$2,$3);
`,[username,password,email]);
console.log(result);
}


insertnewTable("Saumayy23y","abcd12sfa34","Saumay2414@gmail.com");

import { Client } from 'pg';

// Async function to fetch user data and their address together
async function getUserDetailsWithAddress(userId: string) {
    const client = new Client({
        // ...connection config
    });

    try {
        await client.connect();
        const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
        const result = await client.query(query, [userId]);

        if (result.rows.length > 0) {
            console.log('User and address found:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No user or address found with the given ID.');
            return null;
        }
    } catch (err) {
        console.error('Error during fetching user and address:', err);
        throw err;
    } finally {
        await client.end();
    }
}

getUserDetailsWithAddress("1");