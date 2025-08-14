import { UserRepository } from '../../database/UserRepository.js';

// Endpoint para obtener todos los usuarios
export const getAllUsers = async ctx => {
	const users = await UserRepository.getUsers();
	ctx.body = { ok: true, data: users };
	ctx.status = 200;
};

// Este endpoint es similar al anterior, sólo que devuelve
// un usuaario especifico en lugar de uno solo
export const getUserById = async ctx => {
	const userId = ctx.params.id;
	const user = await UserRepository.getUserById(userId);

	if (!user) {
		ctx.status = 404;
		ctx.body = { ok: false, message: 'Usuario no encontrado' };
		return;
	}

	ctx.body = { ok: true, data: user };
	ctx.status = 200;
};

// Endpoint para crear un usuario
export const createUser = async ctx => {
	console.log('Datos del usuario:', ctx.request.body);
	const { name, lastname, email, identification, password } = ctx.request.body;

	const savedUser = await UserRepository.createUser(
		name,
		lastname,
		email,
		identification,
		password
	);

	ctx.body = { ok: true, message: savedUser };
	ctx.status = 201;
};

// Endpoint para actualizar un usuario
export const updateUser = async ctx => {
	const id = ctx.params.id;
	const { name, lastname, email, identification, password } = ctx.request.body;

	const updatedUser = await UserRepository.updateUser({
		id,
		name,
		lastname,
		email,
		identification,
		password,
	});

	ctx.body = { ok: true, message: updatedUser };
};

// Endpoint para eliminar un usuario
export const deleteUser = async ctx => {
	const id = ctx.params.id;
	const deletedUser = await UserRepository.deleteUser(id);

	if (!deletedUser) {
		ctx.status = 404;
		ctx.body = { ok: false, message: 'Usuario no encontrado' };
		return;
	}

	ctx.body = { ok: true, message: 'Usuario eliminado', deletedUser };
};

export const userCtr = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
