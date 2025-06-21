# Experiencia de Christopher con `koa-bodyparser`

---

Christopher se muestra reticente a usar la funcionalidad nativa de `Koa` para extraer el cuerpo de las peticiones http, `koa-bodyparser`, debido a que denuncia que esta funcionalidad pesa mucho en  el proyecto (approx $\\sim 200$ kB). Por tanto, prefirió hacer él mismo un pequeño *Middleware* que se encargara de extaer el contenido del cuerpo de la petición que se haga desde el cliente a nuestra base de datos.

`koa-bodyparser` es el plugin oficial de `Koa` con las funciones de *Middleware* para operaciones de procesamiento del cuerpo de solicitudes HTTP, convirtiéndolas en datos accesibles desde el objeto `ctx.request.body`; este módulo soporta formatos como JSON, texto, datos URL-encoded, facilitando el manejo de datos enviados en las solicitudes. Más iformación en [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser) con detalles e isu e implementación.
