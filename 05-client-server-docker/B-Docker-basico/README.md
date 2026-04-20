# B - Docker básico

## 1. ¿Qué es Docker?

Docker es una herramienta que permite **empaquetar una aplicación con todas sus dependencias** (sistema operativo, librerías, configuración...) en una unidad portable llamada **contenedor**.

Un contenedor es, para entendernos, una "caja" que lleva dentro todo lo necesario para ejecutar tu aplicación. Esa caja se ejecuta igual en tu portátil, en el ordenador de tu compañero, o en un servidor de Amazon.

### Contenedor vs Máquina Virtual

| Aspecto | Máquina Virtual | Contenedor Docker |
|---|---|---|
| Tamaño | GBs | MBs |
| Arranque | Minutos | Segundos |
| Aislamiento | SO completo | Solo proceso |
| Rendimiento | Hay overhead | Casi nativo |

Un contenedor **no** es una máquina virtual: comparte el kernel del sistema operativo anfitrión. Por eso es mucho más ligero.

### Conceptos clave

- **Imagen**: la "receta" o plantilla. Es inmutable. Ej: `nginx:latest`, `python:3.11`.
- **Contenedor**: una instancia en ejecución de una imagen. Puedes tener muchos contenedores de la misma imagen.
- **Docker Hub**: el GitHub de las imágenes. Repositorio público donde hay millones de imágenes listas para usar: [hub.docker.com](https://hub.docker.com).

> Analogía: la **imagen** es la clase, el **contenedor** es el objeto. La imagen es la receta del bizcocho, el contenedor es el bizcocho ya horneado.

## 2. Instalación de Docker

### Windows (con WSL2)

1. Descarga **Docker Desktop** desde [docs.docker.com/desktop](https://docs.docker.com/desktop/install/windows-install/).
2. Durante la instalación, **marca la opción de integración con WSL2**.
3. Abre Docker Desktop → **Settings → Resources → WSL Integration** y activa tu distribución de Ubuntu.
4. Aplica los cambios y reinicia si hace falta.

### macOS

1. Descarga **Docker Desktop** desde [docs.docker.com/desktop/install/mac-install](https://docs.docker.com/desktop/install/mac-install/).
2. Arrastra la app a `Applications`.
3. Ábrela.

### Linux nativo

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER   # para no tener que usar sudo cada vez
# cierra sesión y vuelve a entrar
```

### Verificación

Desde tu terminal (WSL, Mac o Linux):

```bash
docker --version
docker run hello-world
```

El segundo comando descarga una imagen minúscula de prueba y la ejecuta. Si ves un mensaje de bienvenida de Docker, ¡enhorabuena, ya tienes Docker funcionando!

## 3. Primeros comandos

### 3.1 Descargar una imagen: `docker pull`

```bash
docker pull nginx
```

Descarga la última versión de Nginx (un servidor web muy popular) desde Docker Hub.

Puedes especificar versión con una etiqueta (`tag`):

```bash
docker pull nginx:1.25
docker pull python:3.11-slim
```

### 3.2 Ejecutar un contenedor: `docker run`

```bash
docker run -p 8080:80 nginx
```

- `-p 8080:80` mapea el puerto **8080 de tu máquina** al **puerto 80 del contenedor** (donde Nginx escucha).
- `nginx` es la imagen a ejecutar.

Abre el navegador en [http://localhost:8080](http://localhost:8080) → verás la página de bienvenida de Nginx.

Para pararlo: `Ctrl+C`.

### 3.3 Ejecutar en segundo plano: `-d`

```bash
docker run -d -p 8080:80 --name mi-web nginx
```

- `-d` (detached) lo lanza en segundo plano.
- `--name mi-web` le pone nombre al contenedor (si no, Docker le inventa uno gracioso tipo `fervent_banach`).

### 3.4 Listar contenedores: `docker ps`

```bash
docker ps          # solo los que están corriendo
docker ps -a       # todos, incluidos los parados
```

Columnas importantes: `CONTAINER ID`, `IMAGE`, `STATUS`, `PORTS`, `NAMES`.

### 3.5 Parar y arrancar: `stop` / `start`

```bash
docker stop mi-web
docker start mi-web
```

### 3.6 Borrar un contenedor: `rm`

```bash
docker stop mi-web
docker rm mi-web
```

O de un tirón:

```bash
docker rm -f mi-web
```

### 3.7 Ver logs: `docker logs`

```bash
docker logs mi-web           # todos los logs
docker logs -f mi-web        # logs en vivo (como tail -f)
docker logs --tail 20 mi-web # últimas 20 líneas
```

### 3.8 "Meterse dentro" de un contenedor: `docker exec`

```bash
docker exec -it mi-web bash
```

- `-it` te da terminal interactiva.
- `bash` es el comando a ejecutar.

Ahora estás **dentro** del contenedor. Puedes hacer `ls`, `cat`, etc. Para salir: `exit`.

### 3.9 Listar imágenes: `docker images`

```bash
docker images
```

### 3.10 Borrar una imagen: `docker rmi`

```bash
docker rmi nginx
```

## 4. Ejercicio guiado: servir un HTML propio con Nginx

```bash
# 1. Crear una carpeta con un HTML
mkdir ~/mi-web
echo "<h1>Hola desde mi Docker</h1>" > ~/mi-web/index.html

# 2. Lanzar Nginx montando esa carpeta dentro del contenedor
docker run -d \
  -p 8080:80 \
  -v ~/mi-web:/usr/share/nginx/html \
  --name mi-web \
  nginx

# 3. Abrir http://localhost:8080 → verás tu HTML

# 4. Limpiar
docker rm -f mi-web
```

El flag `-v ~/mi-web:/usr/share/nginx/html` es un **volumen**: mapea una carpeta de tu máquina a una carpeta del contenedor. Edita el `index.html`, recarga el navegador y verás los cambios sin reconstruir nada.

## 5. Limpieza

Docker acumula imágenes, contenedores parados y cachés. Para liberar espacio:

```bash
docker container prune    # borra contenedores parados
docker image prune        # borra imágenes sin uso
docker system prune -a    # borra TODO lo que no esté en uso (cuidado)
```

## 6. Resumen de comandos

```bash
docker pull <imagen>
docker run [-d] [-p host:cont] [--name N] [-v host:cont] <imagen>
docker ps [-a]
docker stop <nombre>
docker start <nombre>
docker rm [-f] <nombre>
docker logs [-f] <nombre>
docker exec -it <nombre> bash
docker images
docker rmi <imagen>
```

## Siguiente paso

Ya sabemos usar imágenes que otros han hecho. En la siguiente sección **construiremos nuestra propia imagen**: [C-Dockerfile](../C-Dockerfile).
