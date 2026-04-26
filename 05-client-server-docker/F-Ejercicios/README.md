# Ejercicio: Simulador de mando y control de flotas de drones

## Contexto

A lo largo del curso habéis construido una aplicación de **frontend** muy simple
para el mando y control de flotas de drones. El siguiente paso es darle "vida":
convertirla en un sistema cliente-servidor con **persistencia** y un **simulador**
que mueva los drones en el tiempo, todo orquestado con **Docker Compose**.

Como referencia tenéis el ejemplo [`../E-Drones-CRUD`](../E-Drones-CRUD), que ya
implementa un CRUD básico de drones contra MongoDB, expuesto por una API Flask y
consumido desde un cliente estático servido con Nginx. Partid de esa arquitectura
y ampliadla.

## Qué hay que construir

Una aplicación dockerizada compuesta, como mínimo, por:

- **Frontend**: el que ya tenéis (o una versión adaptada). Debe permitir ver el
  estado de los drones en tiempo (casi) real y enviar órdenes básicas.
- **Backend / API**: expone los endpoints necesarios para listar drones, crear /
  borrar drones de la flota, dar órdenes (despegar, aterrizar, ir a una posición,
  cambiar de estado, etc.) y consultar el estado actual.
- **Base de datos**: persistencia del estado de la flota y, si lo veis útil, de
  un histórico de eventos / telemetría.
- **Simulador**: un servicio independiente que, en bucle, actualiza la posición
  y el estado de los drones (batería que baja, posición que avanza hacia el
  objetivo, transiciones de estado, etc.) y persiste esos cambios.
- **docker-compose.yml** que levante todo con `docker compose up`.

No hace falta que sea realista: un simulador muy simple (mover en línea recta
hacia un destino, bajar batería un % por tick, aterrizar al llegar) es más que
suficiente. Lo importante es la **arquitectura**, no el modelo físico.

### Sugerencias mínimas de modelo

Cada dron podría tener: `id`, `modelo`, `estado` (`en_tierra`, `volando`,
`aterrizando`, `mantenimiento`, ...), `posicion` (lat/lon o x/y), `destino`,
`bateria_pct`. Adaptadlo a vuestro gusto.

## Pueden usar la IA

Podéis apoyaros en la IA (Claude, ChatGPT, Copilot, etc.) como estiméis
oportuno: para generar boilerplate, depurar errores, proponer arquitecturas,
escribir Dockerfiles, etc. Lo que se evalúa es que **entendáis** lo que habéis
montado y sepáis defenderlo, no que lo hayáis tecleado a mano.

## Estructura de la práctica (3 sesiones)

### Sesión 1 — Trabajo autónomo

Os enfrentáis al ejercicio **vosotros solos**. Podéis colaborar entre
compañeros, pero la idea es que seáis vosotros quienes os peleéis con los
problemas: decidir la arquitectura, montar el `docker-compose`, hacer que los
servicios se vean entre sí, etc. No hay sesión de dudas en grupo todavía.

### Sesión 2 — Dudas y puesta en común

Sesión guiada en la que planteáis dudas y las resolvemos **en grupo**. Traed
preguntas concretas: errores que no entendéis, decisiones de diseño en las que
dudáis, problemas de red entre contenedores, etc.

### Sesión 3 — Exposición

Cada uno dispone de **5 a 10 minutos** para exponer su solución. El foco es la
**arquitectura general**, no el detalle del código línea a línea:

- Qué servicios habéis montado y por qué.
- Cómo es vuestro `docker-compose.yml`: redes, volúmenes, dependencias, puertos.
- Cómo se comunican el frontend, el backend, la base de datos y el simulador.
- Decisiones que tomasteis y alternativas que descartasteis.
- Qué ha quedado fuera y qué mejoraríais con más tiempo.

## Entrega

ZIP en moodle:

- Código de todos los servicios.
- `docker-compose.yml` que levante el sistema completo.
- `README.md` breve explicando cómo arrancarlo y qué hace cada servicio.

## Criterios de evaluación

- La aplicación arranca con un único `docker compose up`.
- Los servicios están bien separados (frontend, API, BD, simulador).
- Hay persistencia real (al reiniciar los contenedores el estado sobrevive).
- El simulador modifica el estado de la flota de forma observable desde el
  frontend.
- En la sesión 3 sabéis explicar **por qué** vuestra arquitectura es así.
