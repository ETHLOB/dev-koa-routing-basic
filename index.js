import Koa from 'koa';
import { setFinalLoggerMdw, setResponseTimeMdw } from './middlewares/GenericMdw.js';
import { bodyParserMdw } from './middlewares/BodyParserMdw.js';
import router from './src/router/userRouter.js';

const app = new Koa();
// const router = new Router();

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

const server = app.listen(PORT, () => {
	console.log(`Servidor activo en http://localhost:${PORT}`);
});

server.on('error', err => {
	console.error('Error en el servidor:', err);
});
