# 05 - Cliente / Servidor con Docker

En la lección [04-client-server](../04-client-server) montamos un cliente y un servidor "a mano": arrancando procesos de Python en distintas terminales, instalando dependencias en nuestra máquina y rezando para que todos los alumnos tuvieran la misma versión de todo. Funciona, pero tiene tres problemas:

1. **"En mi ordenador sí funciona"**: cada máquina es un mundo.
2. **Dependencias**: instalar Python, Node, una base de datos... ensucia el equipo.
3. **Despliegue**: pasar de "funciona en mi portátil" a "funciona en un servidor" es doloroso.

La solución del mundo real se llama **Docker**. En esta lección vamos a:

- Familiarizarnos con **Linux** y **WSL** (para los que usáis Windows).
- Entender qué es **Docker** y por qué ha cambiado la forma de desarrollar software.
- Escribir nuestro primer **Dockerfile**.
- Orquestar varios servicios con **Docker Compose**.
- Construir una aplicación CRUD completa (**registro de drones**) con cliente, servidor Flask, MongoDB y una interfaz web para ver los datos.

## Índice

| Carpeta | Contenido |
|---|---|
| [A-Linux-y-WSL](./A-Linux-y-WSL) | Qué es Linux, instalación de WSL en Windows, comandos básicos de terminal |
| [B-Docker-basico](./B-Docker-basico) | Instalación de Docker y primeros contenedores (`run`, `ps`, `logs`, `exec`) |
| [C-Dockerfile](./C-Dockerfile) | Anatomía de un Dockerfile con un ejemplo Flask "hola mundo" |
| [D-Docker-Compose](./D-Docker-Compose) | Qué es Docker Compose y por qué lo necesitamos |
| [E-Drones-CRUD](./E-Drones-CRUD) | **Proyecto final**: CRUD de drones con Flask + MongoDB + mongo-express |

## Objetivos de aprendizaje

Al acabar esta lección el alumno deberá ser capaz de:

- Moverse por una terminal Linux con soltura.
- Explicar la diferencia entre una **imagen** y un **contenedor**.
- Escribir un `Dockerfile` para una aplicación sencilla.
- Levantar un stack multi-contenedor con `docker-compose up`.
- Persistir datos con **volúmenes nombrados**.
- Conectar varios servicios a través de la red interna que crea Compose.

## Requisitos previos

- Haber completado [04-client-server](../04-client-server).
- Tener un editor decente (VSCode recomendado).
- Ganas de romper cosas y arreglarlas.
