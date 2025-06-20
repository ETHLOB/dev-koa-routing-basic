import Koa from 'koa';
import Router from 'koa-router';
import { setFinalLoggerMdw, setResponseTimeMdw } from './middlewares.js';

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 3010;

// piso 1 - primer middleware. Considera que este middleware se ejecuta al final
// de la cadena de middlewares
app.use(setFinalLoggerMdw);

// piso 2 - segundo middleware. Considera que este middleware se ejecuta antes del router
app.use(setResponseTimeMdw);

// piso 3 - router. Considera que este middleware se ejecuta antes de los endpoints
app.use(async ctx => {
	ctx.body = '¡Hola mundo desde Koa!';
	ctx.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());

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
