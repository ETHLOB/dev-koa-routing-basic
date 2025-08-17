import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

async function hashPassword(password) {
	const salt = await bcrypt.genSalt(SALT_ROUNDS);
	return await bcrypt.hash(password, salt);
}

async function comparePasswords(password, hashedPassword) {
	return await bcrypt.compare(password, hashedPassword);
}

export { hashPassword, comparePasswords };
