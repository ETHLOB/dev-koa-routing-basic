# Se nos habla del patrón _singleton_

---

El patrón `singleton` es útil para asegurarnos de que una clase tenga una única instancia en toda la apliación, y ofrece un punto de acceso global a esta instancia. Es de utilidad para casos en que requerimos **una y sólo una** instancia compartida. Un ejemplo de su utilidad:

- [x] Configuración a una **base de datos**.
- [x] Conexión a una **base de datos**.

De esta manera, aseguramos que si esta instancia ya existe, no sea necesario volver a crearla, evitandoi así posibles errores relacionados con reiniciar o crear un mismo servicio múltiples veces.

# Se nos habla de la funcionalidad de `UserRepository.js`

---

Pese a que este no es un **Tutorial de bases de datos**, se nos incluye una funcionalidad que nos permite hacer _CRUD_ en nuestra base de datos _PostgreSQL_ de _Railway_. Para probar que la funcionalidad esté operativa y correcta, podemos hacer una consulta a nuestra base de datos de prueba para traer los registros que introducimos a mano.
