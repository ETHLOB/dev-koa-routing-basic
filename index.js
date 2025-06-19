import Koa from 'koa';
import Router from 'koa-router';
import { setFinalLoggerMdw, setResponseTimeMdw } from './middlewares.js';

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 3010;

app.use(setFinalLoggerMdw);
app.use(setResponseTimeMdw);

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
