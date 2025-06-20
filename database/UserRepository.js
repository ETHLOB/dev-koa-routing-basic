import { executeQuery } from './db.js';

async function getUsers() {
	const query = 'SELECT * FROM users';
	return await executeQuery(query);
}

async function getUserById(id) {
	const query = 'SEELCT * FROM users WHERE id = $1';
	const params = [id];
	const result = await executeQuery(query, params);
	return result[0];
}

async function createUser(name, lastname, email, identification, tokenId, password) {
	const query = `
    INSERT INTO 
    users (
      name, 
      lastname, 
      email, 
      identification, 
      token-id, 
      password
    ) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
	const params = [name, lastname, email, identification, tokenId, password];
	const result = await executeQuery(query, params);
	return result[0];
}

async function updateUser(id, name, lastname, email, identification, tokenId, password) {
	const query = `
    UPDATE users
    SET name = $2, lastname = $3, email = $4, identification = $5, token_id = $6, password = $7
    WHERE id = $1 
    RETURNING *`;
	const params = [id, name, lastname, email, identification, tokenId, password];
	const result = await executeQuery(query, params);
	return result[0];
}

async function deleteUser(id) {
	const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
	const params = [id];
	const result = await executeQuery(query, params);
	return result[0];
}

export const UserRepository = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
