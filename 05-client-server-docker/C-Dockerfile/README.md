# C - Dockerfile

En la sección anterior usamos imágenes que otros habían creado (`nginx`, `hello-world`...). Ahora vamos a **construir nuestra propia imagen** para una aplicación nuestra.

## 1. ¿Qué es un Dockerfile?

Un **Dockerfile** es un archivo de texto con instrucciones paso a paso para construir una imagen Docker. Es, literalmente, la **receta** de la imagen.

Cuando ejecutas `docker build`, Docker lee el Dockerfile y va ejecutando cada instrucción, creando una imagen final reproducible.

## 2. Anatomía de un Dockerfile

```dockerfile
# 1. Imagen base de la que partimos
FROM python:3.11-slim

# 2. Carpeta de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar archivos de mi máquina al contenedor
COPY requirements.txt .

# 4. Ejecutar comandos en el contenedor durante la construcción
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiar el resto del código
COPY . .

# 6. Documentar el puerto que expone la aplicación
EXPOSE 5000

# 7. Comando que se ejecuta al arrancar el contenedor
CMD ["python", "app.py"]
```

### Instrucciones principales

| Instrucción | Para qué sirve |
|---|---|
| `FROM` | De qué imagen partimos. Siempre es la primera línea. |
| `WORKDIR` | Cambia el directorio de trabajo (`cd`) dentro del contenedor. |
| `COPY` | Copia archivos de tu máquina al contenedor. |
| `RUN` | Ejecuta un comando **durante el build** (ej. instalar dependencias). |
| `ENV` | Define variables de entorno. |
| `EXPOSE` | Documenta qué puerto usa la aplicación (no la abre, es solo informativo). |
| `CMD` | Comando por defecto **al arrancar el contenedor**. |
| `ENTRYPOINT` | Similar a CMD, pero más "fijo". Se combinan. |

### La diferencia fundamental: `RUN` vs `CMD`

- **`RUN`** se ejecuta **al construir la imagen**. Lo que genere queda dentro de la imagen.
- **`CMD`** se ejecuta **al arrancar el contenedor**.

Instalar dependencias → `RUN`. Arrancar el servidor → `CMD`.

## 3. Ejemplo práctico: Flask "Hola Mundo"

En la carpeta [ejemplo-flask](./ejemplo-flask) tienes un ejemplo listo para usar. Vamos a analizarlo paso a paso.

### 3.1 La aplicación Flask

`app.py`:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hola Mundo desde Docker!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

> Importante: `host='0.0.0.0'`. Si pones `127.0.0.1` solo escucha en el propio contenedor y desde fuera no se puede acceder.

`requirements.txt`:

```
flask
```

### 3.2 El Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

### 3.3 Construir la imagen

Desde la carpeta del ejemplo:

```bash
cd ejemplo-flask
docker build -t flask-hola-mundo .
```

- `-t flask-hola-mundo` le pone nombre (tag) a la imagen.
- `.` indica el **contexto de build**: la carpeta actual.

Docker irá mostrando cada paso (`Step 1/7: FROM python:3.11-slim` ...).

### 3.4 Ejecutar el contenedor

```bash
docker run -d -p 5000:5000 --name flask-app flask-hola-mundo
```

Abre [http://localhost:5000](http://localhost:5000) y verás el "Hola Mundo desde Docker!".

### 3.5 Ver logs y detener

```bash
docker logs -f flask-app
# Ctrl+C para dejar de seguir logs (el contenedor sigue corriendo)

docker rm -f flask-app
```

## 4. Buenas prácticas

### 4.1 Orden de las instrucciones: aprovecha la caché

Docker **cachea cada paso** del Dockerfile. Si un paso no cambia, reutiliza el resultado de builds anteriores (mucho más rápido).

La regla: **lo que cambia poco, arriba; lo que cambia mucho, abajo**.

Por eso copiamos primero `requirements.txt` e instalamos dependencias, y **después** copiamos el código. Si solo cambias una línea de `app.py`, no se reinstalan las dependencias.

```dockerfile
COPY requirements.txt .         # ← rara vez cambia
RUN pip install -r requirements.txt
COPY . .                         # ← cambia a menudo
```

### 4.2 `.dockerignore`

Igual que `.gitignore`, excluye archivos que no quieres copiar al contenedor. Ejemplo:

```
__pycache__
*.pyc
.venv
.git
node_modules
.env
```

Esto hace los builds más rápidos y evita meter basura en la imagen.

### 4.3 Imágenes base "slim" o "alpine"

`python:3.11` pesa ~900 MB. `python:3.11-slim` pesa ~130 MB. Usa siempre la versión más pequeña que te valga.

### 4.4 No copies todo con `COPY . .` sin pensar

Mete un `.dockerignore` decente o copia solo lo que necesites.

## 5. Ejercicio

1. Modifica `app.py` para que salude con tu nombre.
2. Reconstruye la imagen (`docker build -t flask-hola-mundo .`).
3. Vuelve a lanzar el contenedor.
4. Fíjate en qué pasos usan caché (`CACHED`) y cuáles no.

## Siguiente paso

Ya sabemos hacer nuestra propia imagen. Pero una aplicación de verdad tiene varios servicios (servidor web, base de datos...). En la siguiente sección los orquestaremos con Docker Compose: [D-Docker-Compose](../D-Docker-Compose).
