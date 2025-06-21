import Koa from 'koa';
import Router from 'koa-router';
import { setFinalLoggerMdw, setResponseTimeMdw } from './middlewares/GenericMiddleware.js';
import { bodyParserMdw } from './middlewares/BodyParserMdw.js';
import { UserRepository } from './database/UserRepository.js';
import { escapeLiteral } from 'pg';

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 3010;

// piso 1 - primer middleware. Considera que este middleware se ejecuta tanto al principio
// como al final de la cadena de middlewares
app.use(setFinalLoggerMdw);

// piso 2 - segundo middleware. Considera que este middleware se ejecuta antes del router
app.use(setResponseTimeMdw);

// piso 3 - router. Considera que este middleware se ejecuta antes de los endpoints
app.use(async (ctx, next) => {
	ctx.body = '¡Hola mundo desde Koa!';
	ctx.status = 200;
	await next();
});

app.use(bodyParserMdw);

app.use(router.routes()).use(router.allowedMethods());

router.get('/user', async (ctx, next) => {
	const responseDB = await UserRepository.getUsers();
	ctx.body = { ok: true, data: responseDB };
	ctx.status = 200;
	next();
});

router.post('/user', async (ctx, next) => {
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
	next();
});

router.get('/vacilapi', (ctx, next) => {
	ctx.body = '¡Hola mundo desde Koa-router GET!';
	ctx.status = 200;
	next();
});

router.post('/vacilapi', (ctx, next) => {
	ctx.body = '¡Hola mundo desde Koa-router POST!';
	ctx.status = 200;
	next();
});

router.put('/vacilapi', (ctx, next) => {
	ctx.body = '¡Hola mundo desde Koa-router PUT!';
	ctx.status = 200;
	next();
});

router.delete('/vacilapi', (ctx, next) => {
	ctx.body = '¡Hola mundo desde Koa-router DELETE!';
	ctx.status = 200;
	next();
});

const server = app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});

server.on('error', err => {
	console.error('Error en el servidor:', err);
});
