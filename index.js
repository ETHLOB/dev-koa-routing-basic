import Koa from 'koa';
import { setFinalLoggerMdw, setResponseTimeMdw } from './middlewares.js';

const app = new Koa();
const PORT = process.env.PORT || 3010;

// logger (piso 1 - primer middleware)
app.use(setFinalLoggerMdw);

// x-response-time (piso 2 - segundo middleware)
app.use(setResponseTimeMdw);

// response (piso 3 - tercer middleware)
app.use(async (ctx, next) => {
	ctx.body = '¡Hola, mundo desde Koa!';
	await next();
});

const server = app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});

server.on('error', err => {
	console.error('Error en el servidor:', err);
});
