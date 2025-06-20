# Explicacion

---

Normalmete el request pasa por un contralador, despues el flujo de datos pasa por una capa de negocios, y finalmnete por una capa de datos. Finalmente, el cliente recibe una respuesta diciendo que todo esta correcto. La respuesta tendrá un estatus 200, con un tipo de repsuta en forma de datos.

Con Koa, esto es un poco engorroso. Las capas están definidas, los datos entran a la primera capa (piso 1), donde hace una actividad. Al quedarse sin nada más que hacer, pasará los datos del request al "piso 2". El proceso se repetirá con los datos procesados (o no).
