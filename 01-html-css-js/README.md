# Capítulo 1: Fundamentos de HTML, CSS y JavaScript

## Objetivos

- Entender qué es una página web y cómo funciona el navegador
- Crear documentos HTML desde cero
- Aplicar estilos con CSS
- Añadir interactividad con JavaScript

## Contenido

| Archivo | Descripción | Conceptos |
|---------|-------------|-----------|
| `01-html-basico.html` | Primera página web | Estructura HTML, etiquetas básicas |
| `02-javascript-inline.html` | JavaScript dentro del HTML | `<script>`, eventos onclick, DOM básico |
| `03-calculadora.html` + `.js` | JavaScript en archivo externo | Separación de código, funciones |
| `04-css-estilos.html` + `.css` | Introducción a CSS | Selectores, clases, IDs, propiedades |
| `05-formulario-vuelo.html` + `.css` + `.js` | Ejercicio integrador | Formularios, validación, arrays |

## Cómo usar estos ejemplos

### Opción 1: Abrir directamente
Simplemente haz doble clic en cualquier archivo `.html` para abrirlo en el navegador.

### Opción 2: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Clic derecho en el archivo HTML → "Open with Live Server"
3. Los cambios se actualizan automáticamente

### Opción 3: Servidor simple con Python
```bash
cd 01-html-css-js
python -m http.server 8000
```
Luego abre http://localhost:8000 en el navegador.

## Progresión de aprendizaje

```
01-html-basico.html
        │
        ▼
02-javascript-inline.html
        │
        ▼
03-calculadora.html ◄──── 03-calculadora.js
        │
        ▼
04-css-estilos.html ◄──── 04-css-estilos.css
        │
        ▼
05-formulario-vuelo.html ◄─┬── 05-formulario-vuelo.css
                           └── 05-formulario-vuelo.js
```

## Ejercicios propuestos

### Nivel básico
1. Modifica `01-html-basico.html` añadiendo tu nombre y una imagen
2. En `02-javascript-inline.html`, añade un contador que sume cada vez que pulsas un botón
3. Añade la operación "potencia" a la calculadora

### Nivel intermedio
4. En `04-css-estilos.html`, crea un tema oscuro usando variables CSS
5. Añade validación al formulario de vuelo (la altitud máxima legal en España es 120m)

### Nivel avanzado
6. Guarda los vuelos en `localStorage` para que persistan al recargar
7. Añade un botón para exportar los vuelos a formato JSON

## Herramientas recomendadas

- **Editor**: Visual Studio Code
- **Extensiones VS Code**:
  - Live Server
  - Prettier (formateo de código)
  - HTML CSS Support
- **Navegador**: Chrome o Firefox (con DevTools)

## Atajos útiles del navegador

| Atajo | Acción |
|-------|--------|
| `F12` | Abrir DevTools |
| `Ctrl+Shift+I` | Abrir DevTools |
| `Ctrl+Shift+J` | Abrir consola directamente |
| `Ctrl+U` | Ver código fuente |

## Recursos

- [MDN Web Docs - HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/es/docs/Web/CSS)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [W3Schools](https://www.w3schools.com/) - Tutoriales interactivos

## Siguiente capítulo

[Capítulo 2: Git y GitHub](../02-git-github/)
