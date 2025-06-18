// logger (piso 1 - primer middleware)

async function setFinalLoggerMdw(ctx, next) {
	await next();
	const responseTime = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${responseTime}`);
}

// x-response-time (piso 2 - segundo middleware)
async function setResponseTimeMdw(ctx, next) {
	const start = Date.now();
	await next();
	const timems = Date.now() - start;
	ctx.set('X-Response-Time', `${timems} ms`);
}

export { setFinalLoggerMdw, setResponseTimeMdw };
