# D - Docker Compose

## 1. El problema

Hasta ahora hemos lanzado un contenedor cada vez, a mano:

```bash
docker run -d -p 5000:5000 --name flask-app flask-hola-mundo
```

Pero una aplicación real tiene **varios servicios** que colaboran: un frontend, un backend, una base de datos, quizás una caché, quizás una interfaz de administración... Lanzarlos todos a mano, con los puertos, volúmenes, variables de entorno y orden correcto es **un sufrimiento**.

Además, si quiero que otro desarrollador levante exactamente lo mismo en su máquina, tendría que pasarle una lista de comandos larguísima.

## 2. La solución: Docker Compose

**Docker Compose** es una herramienta que permite definir **toda la aplicación multi-contenedor en un único archivo YAML** (`docker-compose.yml`) y lanzarla con un solo comando.

```bash
docker-compose up
```

Todo lo que estaba disperso en comandos (`docker run ...`) queda declarado en un archivo versionable con Git. El ideal del "infraestructura como código".

## 3. Anatomía de un `docker-compose.yml`

```yaml
services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DEBUG=true
    volumes:
      - ./app:/app
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secreto
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

### Secciones principales

- **`services`**: cada servicio es un contenedor. Aquí hay dos: `web` y `db`.
- **`build`**: construye una imagen desde un Dockerfile local.
- **`image`**: usa una imagen ya existente (ej. de Docker Hub).
- **`ports`**: mapea puertos host → contenedor, como el `-p` de `docker run`.
- **`environment`**: variables de entorno.
- **`volumes`**: montaje de volúmenes (para persistir datos o compartir código).
- **`depends_on`**: dice que un servicio depende de otro (solo controla orden de arranque, no "esperar a que esté listo").
- **`volumes`** (nivel raíz): declara volúmenes nombrados.

## 4. Redes: la magia del DNS interno

Cuando lanzas `docker-compose up`, Compose **crea automáticamente una red privada** donde están todos los servicios. Dentro de esa red, **cada servicio es accesible por su nombre**.

En el ejemplo anterior, desde el contenedor `web` puedes conectarte a la base de datos poniendo como host `db` (no `localhost`, no `127.0.0.1`):

```python
# Dentro del contenedor 'web'
conn = connect(host='db', port=5432, ...)
```

Esta es una de las cosas más elegantes y potentes de Compose.

## 5. Volúmenes: persistir datos

Los contenedores son **efímeros**. Si borras un contenedor de base de datos, **pierdes los datos**. Para evitarlo se usan **volúmenes**.

Hay dos tipos:

### 5.1 Bind mount (carpeta de tu máquina)

```yaml
volumes:
  - ./app:/app
```

Mapea una carpeta tuya a una del contenedor. Útil en desarrollo para que los cambios de código se reflejen sin reconstruir.

### 5.2 Volumen nombrado

```yaml
services:
  db:
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

Docker gestiona el almacenamiento. Es la opción recomendada para datos de bases de datos: persistentes, portables, fáciles de gestionar.

## 6. Comandos imprescindibles

| Comando | Qué hace |
|---|---|
| `docker-compose up` | Levanta todo (logs en pantalla). |
| `docker-compose up -d` | Igual, pero en segundo plano. |
| `docker-compose up --build` | Fuerza reconstruir las imágenes. |
| `docker-compose down` | Para y borra los contenedores. |
| `docker-compose down -v` | Igual, **y borra los volúmenes** (cuidado: borra los datos). |
| `docker-compose ps` | Lista los servicios del proyecto. |
| `docker-compose logs` | Ver logs de todos los servicios. |
| `docker-compose logs -f web` | Logs en vivo del servicio `web`. |
| `docker-compose exec web bash` | Meterse dentro del servicio `web`. |
| `docker-compose restart web` | Reinicia un servicio. |
| `docker-compose build` | Reconstruye las imágenes sin lanzarlas. |

> **Nota sobre el nombre**: dependiendo de la versión, el comando es `docker-compose` (con guión) o `docker compose` (sin guión, integrado en el CLI). En Docker Desktop moderno, usa `docker compose`. Funcionan igual.

## 7. Ciclo de trabajo típico

```bash
# Primera vez o cuando cambias Dockerfiles
docker-compose up --build

# Día a día
docker-compose up -d
docker-compose logs -f
docker-compose down

# Limpiar del todo (borra datos de la BD)
docker-compose down -v
```

## 8. Mini-ejemplo: Flask + Redis

Solo para que veas un Compose con dos servicios. No es obligatorio ejecutarlo.

```yaml
services:
  web:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - redis

  redis:
    image: redis:alpine
```

Desde el código Python (`app.py`) te conectarías a Redis con host `redis`:

```python
import redis
r = redis.Redis(host='redis', port=6379)
```

## Siguiente paso

Tenemos todas las piezas. En la siguiente sección montaremos un proyecto real: un **CRUD de drones** con Flask, MongoDB y una interfaz web para inspeccionar los datos, todo orquestado con Docker Compose.

[E-Drones-CRUD](../E-Drones-CRUD).
