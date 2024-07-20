const { Client } = require("pg");

const client = new Client({
    connectionString:"postgresql://neondb_owner:EHQ6eLWav9by@ep-delicate-dew-a1rnjcoo.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
})

async function createUserTable(){
    await client.connect(); 
    const result = await client.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`)

    console.log(result);
}
createUserTable();


// async function insertUser(){
//     //await client.connect(); 
//     const result = await client.query(`
//         INSERT INTO users(username,email,password) VALUES(,"Ssauau","jbsjbc","jasj",);
//         `)
// }
// insertUser();

