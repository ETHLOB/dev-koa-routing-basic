const ALLOWED_METHODS = new Set(['POST', 'PUT', 'PATCH']);

function queryStringToJson(queryString) {
	Object.fromEntries(queryString.split('&').map(pair => pain.split('=').map(decodeURIComponent)));
}

async function bodyParserMdw(ctx, next) {
	if (ALLOWED_METHODS.has(ctx.request.method)) {
		if (!ctx.request.header['content-type']) {
			ctx.request.header['content-type'] = 'application/json';
		}

		if (!ctx.req.rawBody) {
			ctx.req.rawBody = await new Promise((resolve, reject) => {
				let data = '';
				ctx.req.on('data', chunk => {
					data += chunk;
				});
				ctx.req.on('end', () => {
					resolve(data);
				});
				ctx.req.on('error', err => {
					reject(err);
				});
			});
		}

		if (ctx.req.rawBody) {
			try {
				ctx.request.body = JSON.parse(ctx.req.rawBody);
			} catch (err) {
				ctx.request.body = queryStringToJson(String(ctx.req.rawBody));
			}
		}
	}
	await next();
}

export { bodyParserMdw };
