# Ejercicio 4 - Planificador de Vuelo Fotogramétrico

## Objetivo

Completar una aplicación web que calcule y visualice los **waypoints** para un vuelo fotogramétrico de dron, utilizando **Leaflet** como mapa interactivo.

La interfaz (HTML/CSS) y la estructura base del código JavaScript ya están proporcionadas en el archivo `04-ejercicio-planificador.html`. El alumno debe implementar la lógica de cálculo dentro de la función `calcularMision()`.

## Datos de entrada

La aplicación recibe los siguientes parámetros a través de la interfaz:

### Puntos en el mapa (clic interactivo)
| Punto | Descripción |
|-------|-------------|
| **Takeoff** | Punto de despegue del dron |
| **Landing** | Punto de aterrizaje del dron |
| **Esquina 1** | Primera esquina del área de interés (bounding box) |
| **Esquina 2** | Esquina opuesta del área de interés (bounding box) |

### Parámetros del sensor
| Parámetro | Descripción | Valor por defecto |
|-----------|-------------|-------------------|
| Ancho del sensor | Dimensión horizontal del sensor (mm) | 13.2 |
| Alto del sensor | Dimensión vertical del sensor (mm) | 8.8 |
| Distancia focal | Distancia focal de la cámara (mm) | 8.8 |
| Píxeles ancho | Resolución horizontal (píxeles) | 4000 |
| Píxeles alto | Resolución vertical (píxeles) | 3000 |

### Parámetros del vuelo
| Parámetro | Descripción | Valor por defecto |
|-----------|-------------|-------------------|
| Altura de vuelo | Altura sobre el terreno (m) | 100 |
| Solape frontal | Overlap en dirección de vuelo (%) | 80 |
| Solape lateral | Sidelap entre pasadas (%) | 60 |

## Tareas a implementar

### Tarea 1: Calcular parámetros fotogramétricos

Dentro de la función `calcularMision()`, calcular:

**a) GSD (Ground Sample Distance)** - Resolución en el terreno (cm/píxel):

```
tamaño_pixel = tamaño_sensor / num_pixeles     (mm/píxel)
GSD = (altura * tamaño_pixel) / focal           (m/píxel → convertir a cm/píxel)
```

> Nota: calcular el GSD usando el ancho del sensor y los píxeles de ancho.

**b) Huella de la imagen en el suelo** (metros):

```
huella_ancho = GSD * pixeles_ancho    (en metros, no en cm)
huella_alto  = GSD * pixeles_alto     (en metros, no en cm)
```

**c) Separación entre pasadas** (metros), usando el solape lateral:

```
separacion_pasadas = huella_ancho * (1 - solape_lateral / 100)
```

**d) Separación entre fotos** (metros), usando el solape frontal:

```
separacion_fotos = huella_alto * (1 - solape_frontal / 100)
```

### Tarea 2: Generar waypoints

Generar un array de waypoints (coordenadas `[lat, lng]`) que cubran el área de interés siguiendo un **patrón en zigzag** (tipo "cortacésped"):

1. Determinar los límites del bounding box (`latmin`, `latmax`, `lngmin`, `lngmax`) a partir de las dos esquinas.
2. Convertir las separaciones de metros a grados usando las funciones auxiliares proporcionadas:
   - `metrosAGradosLat(metros)` para la separación entre fotos (dirección norte-sur).
   - `metrosAGradosLng(metros, latitud)` para la separación entre pasadas (dirección este-oeste).
3. Recorrer el área con pasadas paralelas:
   - Las pasadas van en dirección **norte-sur** (variando latitud), separadas en longitud por `separacion_pasadas`.
   - En cada pasada, generar puntos separados por `separacion_fotos`.
   - Alternar la dirección de las pasadas (sur→norte, norte→sur) para formar el zigzag.

### Tarea 3: Dibujar en el mapa

Usando la API de Leaflet:

1. **Waypoints**: Dibujar cada waypoint como un `L.circleMarker` (u otro marcador) numerado en el mapa.
2. **Ruta de vuelo**: Conectar todos los waypoints con una `L.polyline` que represente la trayectoria de vuelo.
3. Incluir el punto de takeoff al inicio y el punto de landing al final de la ruta.

### Tarea 4: Mostrar resultados

Los resultados ya se muestran en el panel con el código proporcionado. Asegurarse de que las variables (`GSD`, `huellaAncho`, `huellaAlto`, `sepPasadas`, `sepFotos`, `waypoints`) tengan los valores correctos.

## Funciones auxiliares proporcionadas

El código base incluye tres funciones que se pueden utilizar:

| Función | Descripción |
|---------|-------------|
| `metrosAGradosLat(metros)` | Convierte metros a grados de latitud (1° ≈ 111.320 m) |
| `metrosAGradosLng(metros, latitud)` | Convierte metros a grados de longitud (depende de la latitud) |
| `distanciaHaversine(lat1, lng1, lat2, lng2)` | Calcula distancia entre dos puntos en metros |

## Entregable

El archivo `04-ejercicio-planificador.html` con la función `calcularMision()` completada. Al hacer clic en "Calcular Waypoints", la aplicación debe:

1. Mostrar los valores calculados (GSD, huella, separaciones, n.º de waypoints) en el panel.
2. Dibujar los waypoints y la ruta de vuelo sobre el mapa.
3. La ruta debe comenzar en el punto de takeoff y terminar en el punto de landing.

## Ejemplo de verificación

Con los valores por defecto (sensor 13.2 x 8.8 mm, focal 8.8 mm, 4000 x 3000 px, altura 100 m, solapes 80%/60%):

- **GSD** ≈ 1.50 cm/px
- **Huella** ≈ 60.0 x 45.0 m
- **Separación entre pasadas** ≈ 24.0 m
- **Separación entre fotos** ≈ 9.0 m
