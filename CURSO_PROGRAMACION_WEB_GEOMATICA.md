# Curso de Programación Web para Geomática Aeronáutica

## Información General

- **Duración estimada**: 7 capítulos (cada capítulo puede dividirse en varias sesiones según necesidad)
- **Nivel**: Máster - Alumnos con capacidad de aprendizaje autónomo
- **Enfoque**: Práctico, orientado a aplicaciones aeronáuticas y geomáticas
- **Proyecto transversal**: Sistema de gestión y visualización de drones
- **Metodología**: Se fomenta el uso de IA (ChatGPT, Claude, Copilot) como herramienta de aprendizaje y desarrollo

---

## Objetivos del Curso

Al finalizar el curso, los alumnos serán capaces de:

1. Crear páginas web desde cero con HTML, CSS y JavaScript
2. Gestionar código con Git y colaborar en GitHub
3. Visualizar datos geográficos en mapas interactivos
4. Desarrollar APIs REST con Python y Flask
5. Implementar comunicación en tiempo real con WebSockets y MQTT
6. Crear visualizaciones 3D de datos geomáticos
7. Estructurar aplicaciones modernas con React

---

## Capítulo 1: Fundamentos de HTML, CSS y JavaScript

### Objetivos
- Entender qué es una página web y cómo funciona el navegador
- Crear documentos HTML desde cero
- Aplicar estilos con CSS
- Añadir interactividad con JavaScript

### Contenidos

#### 1.1 HTML Básico
- ¿Qué es HTML? Estructura de un documento
- Crear un fichero `.html` con un editor de texto (Notepad)
- Abrir el fichero en el navegador
- Etiquetas básicas: `<html>`, `<head>`, `<body>`, `<h1>`, `<p>`, `<div>`
- **Ejercicio**: Crear una página personal con título y párrafos

#### 1.2 JavaScript Inline
- La etiqueta `<script>`
- Variables, funciones y eventos básicos
- `alert()`, `console.log()`, manipulación básica del DOM
- **Ejercicio**: Botón que muestra un mensaje

#### 1.3 JavaScript Externo
- Separar el código en ficheros `.js`
- Enlazar scripts externos con `<script src="">`
- Ventajas de la separación de código
- **Ejercicio**: Calculadora simple

#### 1.4 CSS Básico
- Estilos inline vs etiqueta `<style>` vs fichero externo
- Selectores: elemento, clase, id
- Propiedades básicas: color, margin, padding, font
- **Ejercicio**: Estilizar la calculadora

#### 1.5 Interacción con Formularios
- Elementos de formulario: `<input>`, `<button>`, `<select>`
- Capturar valores con JavaScript
- Eventos: `onclick`, `onchange`, `onsubmit`
- **Ejercicio**: Formulario de datos de vuelo (origen, destino, altitud)

### Herramientas
- Editor de texto simple (Notepad, VS Code)
- Navegador web (Chrome DevTools)

### Entregable
Página HTML con formulario interactivo que capture y muestre datos de vuelo.

---

## Capítulo 2: Control de Versiones con Git y GitHub

### Objetivos
- Entender qué es el control de versiones y por qué es importante
- Dominar los comandos básicos de Git
- Colaborar en proyectos a través de GitHub
- Publicar páginas web con GitHub Pages

### Contenidos

#### 2.1 Introducción a Git
- ¿Qué es el control de versiones?
- Instalación y configuración inicial
- Conceptos: repositorio, commit, rama
- **Ejercicio**: Configurar Git con nombre y email

#### 2.2 Repositorio Local
- `git init` - crear repositorio
- `git status` - ver estado
- `git add` - preparar cambios
- `git commit` - guardar cambios
- `git log` - ver historial
- **Ejercicio**: Crear repo local con el código del capítulo 1

#### 2.3 GitHub: Repositorio Remoto
- Crear cuenta en GitHub (pre-requisito)
- Crear repositorio en GitHub
- `git remote` - conectar local y remoto
- `git push` - subir cambios
- `git pull` - descargar cambios
- **Ejercicio**: Subir el proyecto a GitHub

#### 2.4 Ramas y Merge
- ¿Qué son las ramas?
- `git branch` - crear ramas
- `git checkout` / `git switch` - cambiar de rama
- `git merge` - fusionar ramas
- **Ejercicio**: Crear rama para nueva funcionalidad

#### 2.5 Colaboración
- Clonar repositorios: `git clone`
- Fork y Pull Requests
- Resolver conflictos básicos
- Buenas prácticas de commits
- **Ejercicio**: Colaborar en parejas modificando el mismo proyecto

#### 2.6 GitHub Pages
- Publicar página web estática desde GitHub
- Configuración del repositorio
- **Ejercicio**: Publicar la página del capítulo 1 en GitHub Pages

### Herramientas
- Git (CLI)
- GitHub
- VS Code (integración Git)

### Entregable
Repositorio en GitHub con el código del curso y página publicada en GitHub Pages.

---

## Capítulo 3: Mapas Web con Leaflet

### Objetivos
- Integrar mapas interactivos en páginas web
- Trabajar con coordenadas y sistemas de referencia
- Representar datos geográficos (puntos, líneas, polígonos)
- Entender y manipular GeoJSON

### Contenidos

#### 3.1 Introducción a Leaflet
- ¿Qué es Leaflet? Librerías de mapas web
- Incluir Leaflet via CDN
- Crear un mapa básico centrado en España
- Controles de zoom y capas base
- **Ejercicio**: Mapa centrado en el aeropuerto de Barajas

#### 3.2 Markers y Popups
- Añadir marcadores en coordenadas específicas
- Personalizar iconos
- Popups con información
- **Ejercicio**: Mapa con los principales aeropuertos españoles

#### 3.3 Líneas y Polígonos
- Dibujar rutas aéreas (Polyline)
- Zonas restringidas (Polygon)
- Círculos para zonas de cobertura
- **Ejercicio**: Ruta Madrid-Barcelona con zonas de exclusión

#### 3.4 Sistemas de Coordenadas
- WGS84 (EPSG:4326) - coordenadas geográficas
- Pseudo-Mercator (EPSG:3857) - proyección web
- Conversión entre sistemas
- Librería proj4js para transformaciones
- **Ejercicio**: Conversor de coordenadas interactivo

#### 3.5 GeoJSON
- Estructura del formato GeoJSON
- Tipos de geometría: Point, LineString, Polygon
- Propiedades y features
- Cargar GeoJSON en Leaflet
- **Ejercicio**: Cargar espacio aéreo español desde GeoJSON

#### 3.6 Consumir Datos Externos (Fetch)
- Introducción a `fetch()` y promesas
- Cargar datos JSON desde fichero
- Gestión de errores básica
- **Ejercicio**: Cargar posiciones de aeronaves desde fichero JSON

### Herramientas
- Leaflet.js (CDN)
- proj4js (CDN)
- GeoJSON.io (para crear/visualizar GeoJSON)

### Entregable
Mapa interactivo con aeropuertos, rutas aéreas y conversor de coordenadas.

---

## Capítulo 4: Backend con Python y Flask

### Objetivos
- Entender la arquitectura cliente-servidor
- Configurar entornos virtuales en Python
- Crear una API REST básica
- Implementar operaciones CRUD con SQLite

### Contenidos

#### 4.1 Python Básico (Repaso/Introducción)
- Variables, tipos de datos, funciones
- Listas y diccionarios
- Módulos e importaciones
- **Ejercicio**: Script que procesa datos de vuelos

#### 4.2 Entornos Virtuales
- ¿Por qué usar entornos virtuales?
- Crear venv: `python -m venv venv`
- Activar/desactivar entorno
- `pip install` y `requirements.txt`
- **Ejercicio**: Crear entorno e instalar Flask

#### 4.3 Flask: Primer Servidor
- ¿Qué es Flask?
- Aplicación mínima "Hello World"
- Rutas y métodos HTTP (GET, POST)
- Ejecutar servidor de desarrollo
- **Ejercicio**: Servidor que devuelve JSON

#### 4.4 API REST: Diseño
- Principios REST
- Endpoints para recursos
- Códigos de respuesta HTTP
- Diseño de API para gestión de drones y pilotos
- **Ejercicio**: Documentar endpoints del proyecto

#### 4.5 SQLite: Base de Datos
- ¿Qué es SQLite? Ventajas para desarrollo
- Crear base de datos y tablas
- Operaciones SQL básicas: SELECT, INSERT, UPDATE, DELETE
- Conectar Flask con SQLite
- **Ejercicio**: Crear tablas para pilotos y drones

#### 4.6 CRUD Completo
- Crear (POST) - registrar nuevos drones/pilotos
- Leer (GET) - listar y obtener detalles
- Actualizar (PUT) - modificar datos
- Eliminar (DELETE) - dar de baja
- **Ejercicio**: Implementar CRUD completo

#### 4.7 Conectar Frontend y Backend
- CORS: qué es y cómo configurarlo
- Fetch desde el navegador al servidor
- Mostrar datos en el mapa de Leaflet
- **Ejercicio**: Mostrar drones registrados en el mapa

### Modelo de Datos

```
Piloto:
  - id (autoincrement)
  - nombre
  - licencia
  - email
  - telefono
  - fecha_alta

Dron:
  - id (autoincrement)
  - matricula
  - modelo
  - peso_kg
  - piloto_id (FK)
  - estado (activo/mantenimiento/baja)
```

### Herramientas
- Python 3.x
- Flask
- SQLite (incluido en Python)
- Postman o Thunder Client (testing API)

### Entregable
API REST funcional con CRUD de pilotos y drones, conectada al frontend.

---

## Capítulo 5: Comunicación en Tiempo Real

### Objetivos
- Entender la diferencia entre HTTP y WebSockets
- Implementar comunicación bidireccional en tiempo real
- Introducirse en MQTT para IoT/drones
- Simular telemetría de drones

### Contenidos

#### 5.1 Limitaciones de HTTP
- Request-Response: el cliente siempre inicia
- Polling vs Long-Polling
- Necesidad de comunicación en tiempo real
- **Ejercicio**: Simular polling para actualizar posición

#### 5.2 WebSockets
- ¿Qué son los WebSockets?
- Conexión persistente bidireccional
- Eventos: open, message, close, error
- Librería `websockets` en Python
- **Ejercicio**: Chat simple cliente-servidor

#### 5.3 WebSockets con Flask
- Flask-SocketIO
- Emitir eventos desde servidor
- Escuchar eventos en cliente
- Rooms y namespaces
- **Ejercicio**: Servidor que emite posiciones de drone

#### 5.4 Visualización en Tiempo Real
- Actualizar marcador en Leaflet
- Traza del recorrido (polyline dinámica)
- Interpolación de movimiento
- **Ejercicio**: Drone moviéndose de A a B en el mapa

#### 5.5 Introducción a MQTT
- ¿Qué es MQTT? Publish/Subscribe
- Broker, Topics, QoS
- MQTT vs WebSockets: cuándo usar cada uno
- Brokers públicos para pruebas (test.mosquitto.org)
- **Ejercicio**: Publicar y suscribirse a topics

#### 5.6 MQTT en el Navegador
- MQTT sobre WebSockets
- Librería MQTT.js
- Conectar frontend a broker MQTT
- **Ejercicio**: Recibir telemetría de drone via MQTT

#### 5.7 Simulador de Drone
- Script Python que publica posiciones
- Movimiento entre waypoints
- Datos de telemetría: posición, altitud, velocidad, batería
- **Ejercicio**: Simulador completo con visualización

### Protocolo de Telemetría (ejemplo)

```json
Topic: drones/{matricula}/telemetry

{
  "timestamp": "2024-01-15T10:30:00Z",
  "position": {
    "lat": 40.4168,
    "lon": -3.7038,
    "alt": 120
  },
  "speed": 15.5,
  "heading": 45,
  "battery": 78
}
```

### Herramientas
- Flask-SocketIO
- Paho-MQTT (Python)
- MQTT.js (JavaScript)
- Broker público mosquitto

### Entregable
Sistema que simula un drone volando entre dos puntos con telemetría en tiempo real visualizada en el mapa.

---

## Capítulo 6: Visualización 3D con MapLibre

### Objetivos
- Crear visualizaciones 3D de datos geográficos
- Trabajar con terreno y elevación
- Representar trayectorias de vuelo en 3D
- Gestionar múltiples drones simultáneamente

### Contenidos

#### 6.1 Introducción a MapLibre GL JS
- ¿Qué es MapLibre? Diferencias con Leaflet
- Renderizado WebGL
- Estilos y capas vectoriales
- **Ejercicio**: Mapa básico con MapLibre

#### 6.2 Capacidades 3D Nativas
- Pitch y bearing (inclinación y rotación)
- Extrusión de edificios
- Navegación 3D
- **Ejercicio**: Vista 3D del aeropuerto

#### 6.3 Terreno 3D
- Fuentes de datos de elevación
- Configurar terreno en MapLibre
- Exageración vertical
- **Ejercicio**: Visualizar terreno montañoso

#### 6.4 Trayectorias de Vuelo 3D
- Líneas con altitud (3D lines)
- Interpolación de waypoints
- Animación de recorrido
- **Ejercicio**: Ruta de drone entre waypoints con altitud

#### 6.5 Múltiples Drones
- Gestión de estado de varios drones
- Símbolos 3D personalizados
- Actualización eficiente de posiciones
- **Ejercicio**: Dashboard con 3-4 drones simultáneos

#### 6.6 Integración con Backend
- Recibir posiciones via WebSocket/MQTT
- Actualizar visualización 3D en tiempo real
- Panel de información de cada drone
- **Ejercicio**: Sistema completo multi-drone

### Modelo de Waypoints

```json
{
  "mision_id": "M001",
  "drone": "EC-DRN01",
  "waypoints": [
    {"lat": 40.41, "lon": -3.70, "alt": 50, "accion": "despegue"},
    {"lat": 40.42, "lon": -3.69, "alt": 100, "accion": "crucero"},
    {"lat": 40.43, "lon": -3.68, "alt": 100, "accion": "foto"},
    {"lat": 40.42, "lon": -3.70, "alt": 50, "accion": "aterrizaje"}
  ]
}
```

### Herramientas
- MapLibre GL JS
- Maptiler (tiles y terreno) - cuenta gratuita
- Three.js (opcional, para modelos 3D avanzados)

### Entregable
Visualización 3D con terreno mostrando múltiples drones siguiendo rutas de waypoints en tiempo real.

---

## Capítulo 7: Desarrollo Moderno con React

### Objetivos
- Entender la filosofía de React y componentes
- Configurar un proyecto con Vite
- Aplicar estilos con TailwindCSS
- Integrar mapas y conexiones en tiempo real

### Contenidos

#### 7.1 ¿Por qué React?
- Problemas del desarrollo vanilla a escala
- Componentes y reutilización
- Virtual DOM y renderizado eficiente
- Ecosistema y comunidad
- **Ejercicio**: Comparar mismo UI en vanilla vs React

#### 7.2 Configuración del Proyecto
- Crear proyecto con Vite (`npm create vite@latest`)
- Estructura de carpetas
- JSX: HTML en JavaScript
- Primer componente
- **Ejercicio**: Proyecto base configurado

#### 7.3 Componentes y Props
- Componentes funcionales
- Props: pasar datos a componentes
- Composición de componentes
- **Ejercicio**: Componente DroneCard reutilizable

#### 7.4 Estado con useState
- Estado local del componente
- Actualización y re-renderizado
- Eventos en React
- **Ejercicio**: Lista de drones con filtros

#### 7.5 Efectos con useEffect
- Ciclo de vida del componente
- Llamadas a API (fetch)
- Limpieza de efectos
- **Ejercicio**: Cargar drones desde el backend

#### 7.6 TailwindCSS
- Utilidades CSS
- Configuración con Vite
- Diseño responsive
- **Ejercicio**: Estilizar componentes con Tailwind

#### 7.7 Integración de MapLibre en React
- Componente de mapa
- Referencias (useRef)
- Sincronizar estado React con mapa
- **Ejercicio**: Mapa como componente React

#### 7.8 Proyecto Integrador
- Dashboard de gestión de drones
- Vista de mapa 3D
- Lista de drones con estado
- Conexión en tiempo real
- CRUD desde la interfaz

### Estructura del Proyecto Final

```
src/
├── components/
│   ├── Map/
│   │   └── Map3D.jsx
│   ├── Drones/
│   │   ├── DroneList.jsx
│   │   ├── DroneCard.jsx
│   │   └── DroneForm.jsx
│   └── Layout/
│       ├── Header.jsx
│       └── Sidebar.jsx
├── hooks/
│   ├── useDrones.js
│   └── useMQTT.js
├── services/
│   ├── api.js
│   └── mqtt.js
├── App.jsx
└── main.jsx
```

### Herramientas
- React 18+
- Vite
- TailwindCSS
- React-Map-GL (wrapper de MapLibre para React)

### Entregable
Aplicación React completa con dashboard de gestión de drones, mapa 3D y telemetría en tiempo real.

---

## Despliegue

### Desarrollo Local (recomendado para el curso)
Todo el desarrollo se puede hacer en local:
- **Frontend**: Abrir HTML directamente o usar `npx serve` / Live Server de VS Code
- **Backend Flask**: `python app.py` (servidor de desarrollo)
- **Base de datos**: SQLite (fichero local, sin instalación)

### Opciones de Despliegue Gratuito (opcional/bonus)

#### Frontend (HTML/React)
| Servicio | Ventajas | Notas |
|----------|----------|-------|
| **GitHub Pages** | Integrado con el repo, muy fácil | Solo estático |
| **Vercel** | Deploy automático desde GitHub | Gratis para proyectos personales |
| **Netlify** | Similar a Vercel | Muy fácil de configurar |

#### Backend (Flask)
| Servicio | Ventajas | Notas |
|----------|----------|-------|
| **PythonAnywhere** | Específico para Python, muy fácil | Tier gratuito limitado pero suficiente |
| **Render** | Deploy desde GitHub, SSL gratis | Spin-down en inactividad (tier gratis) |
| **Railway** | Fácil, 500h/mes gratis | Requiere tarjeta (sin cobro) |

#### Recomendación para el curso
1. **Frontend en GitHub Pages** - Ya lo aprenden en el capítulo 2
2. **Backend en PythonAnywhere** - Interfaz sencilla, pensado para Python

### Ejemplo de arquitectura desplegada
```
┌─────────────────────────────────────────────────────────┐
│                      USUARIO                             │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────▼─────────────┐
        │   GitHub Pages / Vercel   │
        │   (Frontend React/HTML)   │
        └─────────────┬─────────────┘
                      │ fetch / WebSocket
        ┌─────────────▼─────────────┐
        │     PythonAnywhere        │
        │   (Flask + SQLite)        │
        └─────────────┬─────────────┘
                      │
        ┌─────────────▼─────────────┐
        │   test.mosquitto.org      │
        │   (Broker MQTT público)   │
        └───────────────────────────┘
```

---

## Proyecto Final del Curso

### Descripción
Sistema de gestión y monitorización de flota de drones que integra todos los conocimientos del curso.

### Requisitos Mínimos
1. **Frontend React** con mapa 3D (MapLibre)
2. **Backend Flask** con API REST
3. **Base de datos** SQLite con pilotos y drones
4. **Tiempo real** con WebSockets o MQTT
5. **Código en GitHub** con historial de commits limpio
6. **Documentación** básica en README

### Funcionalidades
- Registro y gestión de pilotos
- Registro y gestión de drones
- Asignación drone-piloto
- Visualización de drones en mapa 3D
- Simulación de vuelo entre waypoints
- Telemetría en tiempo real

### Evaluación
- Funcionalidad (40%)
- Código limpio y organizado (20%)
- Uso correcto de Git (15%)
- Interfaz de usuario (15%)
- Documentación (10%)

### Bonus (opcional)
- Despliegue en GitHub Pages (frontend) + servicio gratuito (backend)
- Múltiples drones simultáneos
- Historial de vuelos
- Alertas (batería baja, fuera de zona)

---

## Recursos y Referencias

### Documentación Oficial
- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JavaScript
- [Leaflet](https://leafletjs.com/reference.html)
- [Flask](https://flask.palletsprojects.com/)
- [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
- [React](https://react.dev/)

### Herramientas Útiles
- [GeoJSON.io](https://geojson.io/) - Editor visual de GeoJSON
- [EPSG.io](https://epsg.io/) - Búsqueda de sistemas de coordenadas
- [Postman](https://www.postman.com/) - Testing de APIs

### Datos Geográficos
- [Natural Earth](https://www.naturalearthdata.com/) - Datos cartográficos libres
- [OpenStreetMap](https://www.openstreetmap.org/) - Mapa colaborativo
- [ICAO](https://www.icao.int/) - Datos aeronáuticos

---

## Changelog

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 2.0 | Enero 2025 | Reestructuración completa: Git adelantado a cap 2, añadido despliegue, sin TypeScript |
| 1.0 | - | Versión original (carpeta V1) |

https://www.youtube.com/watch?v=fPqZBCqzF48
https://youtu.be/JwuUfAWh3Jk?si=fPZK63K8wshzpXCW