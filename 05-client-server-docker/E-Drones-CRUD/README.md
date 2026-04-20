# E - Registro de Drones (CRUD)

Proyecto final de la lección. Aplicación CRUD completa para gestionar una flota de drones. Todo orquestado con Docker Compose: un comando y tienes arriba cliente, servidor, base de datos e interfaz de administración.

## 1. Qué vas a construir

![Arquitectura](https://via.placeholder.com/1x1.png)

```
┌──────────────┐   HTTP    ┌──────────────┐  pymongo  ┌──────────────┐
│   client     │──────────▶│   server     │──────────▶│    mongo     │
│  (nginx)     │  :5000    │  (Flask)     │  :27017   │  (MongoDB)   │
│  :8080       │           │              │           │              │
└──────────────┘           └──────────────┘           └──────┬───────┘
                                                              │
                                                              │ :27017
                                                              ▼
                                                       ┌──────────────┐
                                                       │ mongo-express│
                                                       │   :8081      │
                                                       └──────────────┘
```

Cuatro servicios:

| Servicio | Imagen | Puerto host | Qué hace |
|---|---|---|---|
| **client** | `nginx:alpine` (build) | `8080` | Sirve el HTML con el formulario y la tabla. |
| **server** | `python:3.11-slim` (build) | `5000` | API REST en Flask con endpoints CRUD. |
| **mongo** | `mongo:7` | `27017` | Base de datos donde persisten los drones. |
| **mongo-express** | `mongo-express:1.0.2` | `8081` | UI web para inspeccionar la BD. |

## 2. Estructura de archivos

```
E-Drones-CRUD/
├── docker-compose.yml
├── README.md
├── client/
│   ├── Dockerfile
│   └── index.html
└── server/
    ├── Dockerfile
    ├── .dockerignore
    ├── app.py
    └── requirements.txt
```

## 3. Arrancar todo

Desde esta carpeta:

```bash
docker compose up --build
```

La primera vez tardará un minuto (descarga Mongo, mongo-express, Python y construye las imágenes). En siguientes arranques será casi instantáneo.

Una vez arriba, abre:

- [http://localhost:8080](http://localhost:8080) → **la aplicación** (cliente).
- [http://localhost:8081](http://localhost:8081) → **mongo-express** (usuario/contraseña: `admin`/`admin123`).
- [http://localhost:5000/api/health](http://localhost:5000/api/health) → test de vida de la API.

### Probarlo

1. En [http://localhost:8080](http://localhost:8080), rellena el formulario y pulsa **Guardar**. Aparecerá en la tabla.
2. Edita y borra drones desde la tabla.
3. Abre [http://localhost:8081](http://localhost:8081), entra en la base de datos `dronesdb`, colección `drones`, y **verás exactamente los documentos** que has creado.
4. Para el sistema con `Ctrl+C` (o `docker compose down` si lo lanzaste con `-d`).
5. Vuelve a arrancarlo: **tus drones siguen ahí**. Gracias al volumen nombrado `mongo-data`.

## 4. El servidor (Flask + pymongo)

`server/app.py` expone:

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/api/health` | Health check. |
| GET | `/api/drones` | Lista todos los drones. |
| GET | `/api/drones/<id>` | Obtiene un dron. |
| POST | `/api/drones` | Crea un dron (JSON en body). |
| PUT | `/api/drones/<id>` | Actualiza un dron. |
| DELETE | `/api/drones/<id>` | Borra un dron. |

Modelo de dron:

```json
{
  "modelo": "Mavic 3",
  "fabricante": "DJI",
  "peso_kg": 0.9,
  "autonomia_min": 46,
  "estado": "operativo"
}
```

La conexión a Mongo se resuelve por **nombre de servicio**, no por IP:

```python
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://mongo:27017/')
```

Fíjate en el host: **`mongo`**. Ese es el nombre del servicio en el `docker-compose.yml`. Docker Compose resuelve ese nombre dentro de su red privada.

## 5. El cliente (HTML + JS vanilla)

`client/index.html` es una única página con:

- Formulario para crear / editar drones.
- Tabla con todos los drones, con botones **Editar** y **Borrar**.
- Llamadas `fetch` a `http://localhost:5000/api/drones`.

> Nota importante: el cliente se comunica con el servidor desde el **navegador del usuario**, no desde dentro de Docker. Por eso apunta a `localhost:5000`, no a `server:5000`.

El servidor tiene `flask-cors` habilitado para aceptar peticiones cross-origin (el cliente viene de `:8080`, el servidor está en `:5000`).

## 6. El `docker-compose.yml` explicado

```yaml
services:
  mongo:
    image: mongo:7
    volumes:
      - mongo-data:/data/db      # ← persistencia
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123

  mongo-express:
    image: mongo-express:1.0.2
    depends_on: [mongo]
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://admin:admin123@mongo:27017/

  server:
    build: ./server              # ← construye desde ./server/Dockerfile
    depends_on: [mongo]
    environment:
      MONGO_URI: mongodb://admin:admin123@mongo:27017/
    ports:
      - "5000:5000"

  client:
    build: ./client
    depends_on: [server]
    ports:
      - "8080:80"

volumes:
  mongo-data:                    # ← volumen nombrado declarado aquí
```

Cosas a entender:

1. **`build: ./server`** → Docker busca un `Dockerfile` en esa carpeta y construye la imagen.
2. **`image: mongo:7`** → descarga directamente una imagen ya hecha.
3. **`depends_on`** → orden de arranque. Mongo arranca antes que server, y server antes que client. *Aviso*: solo controla el orden de arranque, no espera a que el servicio esté "listo para aceptar conexiones". Mongo tarda unos segundos en estar listo, pero Flask reintenta al primer fallo.
4. **`volumes: mongo-data:/data/db`** → los datos de Mongo se guardan en un volumen nombrado (gestionado por Docker) y no se pierden al bajar los contenedores.
5. **`environment`** → cada servicio recibe las variables que necesita.

## 7. Comandos útiles

```bash
# Arrancar (primera vez o tras cambios)
docker compose up --build

# Arrancar en background
docker compose up -d

# Ver logs en vivo (todos)
docker compose logs -f

# Ver logs de un servicio concreto
docker compose logs -f server

# Ejecutar un shell dentro del servidor
docker compose exec server bash

# Bajar el sistema (conservando datos)
docker compose down

# Bajar y BORRAR los datos
docker compose down -v

# Ver qué está corriendo
docker compose ps
```

## 8. Explorar Mongo desde mongo-express

1. Abre [http://localhost:8081](http://localhost:8081).
2. Login: `admin` / `admin123`.
3. Pincha en la BD `dronesdb`.
4. Pincha en la colección `drones`.
5. Verás todos los documentos como JSON, podrás buscarlos, editarlos o borrarlos desde la UI.

## 9. Ejercicios propuestos

1. **Nuevo campo**: añade un campo `numero_serie` al modelo de dron. Modifica `app.py`, el formulario y la tabla.
2. **Filtrar**: añade un endpoint `GET /api/drones?estado=operativo` que filtre por estado.
3. **Validación**: impide crear dos drones con el mismo `numero_serie`.
4. **Datos de ejemplo**: crea un script que inserte 10 drones al arrancar la primera vez (puedes usar un archivo `init.js` montado en `/docker-entrypoint-initdb.d/` del contenedor de Mongo).
5. **Reverse proxy**: configura Nginx (en el servicio `client`) para hacer de proxy a `/api` y eliminar CORS.

## 10. Troubleshooting

| Síntoma | Causa probable | Solución |
|---|---|---|
| `Error: listen EADDRINUSE` al levantar | Puerto 8080, 5000, 8081 o 27017 ocupado | `docker compose down`, o cambia los puertos host. |
| El cliente no puede hablar con la API | CORS, o el servidor no arrancó | Mira los logs: `docker compose logs server`. |
| mongo-express muestra "could not connect" | Mongo tarda en arrancar | Espera 10 segundos y recarga. |
| Cambié `app.py` y no se ve el cambio | Hay que reconstruir la imagen | `docker compose up --build`. |
| Se me ha llenado el disco | Imágenes y volúmenes viejos | `docker system prune -a` (cuidado). |

## 11. Lo que te llevas de aquí

- Un stack de 4 servicios orquestado con **un solo archivo**.
- Persistencia de datos con **volúmenes nombrados**.
- Comunicación entre contenedores por **nombre de servicio**.
- Separación entre **build** (imágenes propias) e **image** (imágenes de terceros).
- Un **mismo comando** arranca todo en cualquier máquina con Docker.

Eso último es la promesa de Docker cumplida: *"en mi máquina funciona"* → *"funciona en cualquier máquina"*.
