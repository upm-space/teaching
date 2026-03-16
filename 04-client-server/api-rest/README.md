# 04 - Cliente / Servidor REST

En este ejercicio vamos a montar una **API REST** con Python y a consumirla desde una página HTML independiente. La API permite guardar y consultar un nombre.

## Estructura del proyecto

```
04-client-server/
├── server/          # Servidor Python (API REST)
│   ├── app.py
│   └── requirements.txt
├── client/          # Cliente web (HTML puro)
│   └── index.html
└── README.md
```

- **server/**: contiene el servidor. Se ejecuta con Python.
- **client/**: contiene una página HTML que se abre directamente en el navegador. No necesita servidor web.

---

## 1. Instalar Python

### macOS

macOS ya viene con Python 3 instalado en versiones recientes. Compruébalo:

```bash
python3 --version
```

Si no lo tienes, instálalo con [Homebrew](https://brew.sh/):

```bash
brew install python
```

### Windows

1. Ve a [python.org/downloads](https://www.python.org/downloads/) y descarga la última versión.
2. **Importante**: durante la instalación marca la casilla **"Add Python to PATH"**.
3. Abre una terminal (CMD o PowerShell) y comprueba:

```bash
python --version
```

> En Windows el comando suele ser `python` (sin el `3`). En macOS/Linux es `python3`.

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install python3 python3-venv python3-pip
```

---

## 2. Qué es un entorno virtual (venv)

Cuando instalas librerías con `pip`, se instalan de forma global en tu sistema. Esto puede causar problemas si distintos proyectos necesitan versiones diferentes de la misma librería.

Un **entorno virtual** (`venv`) es una carpeta aislada que contiene su propia copia de Python y sus propias librerías. Así cada proyecto tiene sus dependencias separadas y no interfieren entre sí.

Piensa en ello como una "burbuja" para tu proyecto.

---

## 3. Preparar el servidor (paso a paso)

### 3.1 Abrir una terminal y entrar en la carpeta del servidor

```bash
cd 04-client-server/server
```

### 3.2 Crear el entorno virtual

```bash
python3 -m venv venv
```

> En Windows usa `python -m venv venv`.

Esto crea una carpeta `venv/` dentro de `server/`. Ahí se instalarán todas las dependencias.

### 3.3 Activar el entorno virtual

**macOS / Linux:**
```bash
source venv/bin/activate
```

**Windows (CMD):**
```bash
venv\Scripts\activate
```

**Windows (PowerShell):**
```bash
venv\Scripts\Activate.ps1
```

Sabrás que está activo porque verás `(venv)` al principio de la línea de tu terminal:

```
(venv) usuario@equipo:~/server$
```

### 3.4 Instalar las dependencias

```bash
pip install -r requirements.txt
```

Esto instala:
- **Flask**: el framework web que usamos para crear la API.
- **flask-cors**: permite que el navegador haga peticiones al servidor desde otra dirección (necesario porque el cliente HTML se abre como archivo local).
- **flasgger**: genera documentación interactiva de la API automáticamente (Swagger / OpenAPI).

### 3.5 Arrancar el servidor

```bash
python app.py
```

Verás algo como:

```
 * Documentación OpenAPI en: http://0.0.0.0:5050/apidocs/
 * Running on http://0.0.0.0:5050
```

El servidor ya está escuchando en el puerto **5050**.

> Puedes cambiar el puerto con `python app.py --port 8080`.

### 3.6 Probar que funciona

Abre un navegador y ve a:

- **http://localhost:5050/apidocs/** — documentación interactiva (Swagger UI). Desde ahí puedes probar los endpoints directamente.
- **http://localhost:5050/nombre** — devuelve el nombre almacenado en formato JSON.

### 3.7 Desactivar el entorno virtual (cuando termines)

```bash
deactivate
```

---

## 4. Usar el cliente web

1. Abre el archivo `client/index.html` directamente en tu navegador (doble clic o arrástralo al navegador).
2. Verás un formulario con dos campos arriba: **IP** y **Puerto** del servidor. Por defecto apunta a `localhost:5050`.
3. Pulsa **"Obtener nombre"** para consultar el nombre almacenado.
4. Escribe un nombre y pulsa **"Guardar"** para establecerlo.

> Si el servidor está en otro equipo de la red, pon su IP (por ejemplo `192.168.1.42`) y el puerto correspondiente.

---

## 5. La API en detalle

| Método | URL       | Cuerpo (JSON)            | Respuesta (JSON)                                |
|--------|-----------|--------------------------|-------------------------------------------------|
| GET    | `/nombre` | —                        | `{ "nombre": "María" }`                         |
| PUT    | `/nombre` | `{ "nombre": "María" }`  | `{ "nombre": "María", "mensaje": "Nombre actualizado" }` |

---

## 6. Resumen de comandos

```bash
# Solo la primera vez
cd server
python3 -m venv venv          # crear entorno virtual
source venv/bin/activate      # activar (macOS/Linux)
pip install -r requirements.txt

# Cada vez que quieras arrancar el servidor
source venv/bin/activate      # activar entorno virtual
python app.py                 # arrancar servidor
# Ctrl+C para parar
deactivate                    # desactivar entorno virtual
```
