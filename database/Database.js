import pkg from 'pg';

const { Pool } = pkg;

let pool = null;

export function getDatabaseInstance() {
	if (!pool) {
		pool = new Pool({
			user: process.env.DB_USER,
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			password: process.env.DB_PASSWORD,
			port: process.env.DB_PORT,
		});
	}
	return pool;
}

export async function executeQuery(query, params = []) {
	console.log(`Executing query: ${query} with params: ${params}`);
	const db = getDatabaseInstance();
	const res = await db.query(query, params);
	return res.rows;
}
