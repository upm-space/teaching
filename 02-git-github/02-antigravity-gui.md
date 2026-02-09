# Apartado 2: Git desde Antigravity (Interfaz Gráfica)

Antigravity (el fork de VS Code de Google) tiene integración nativa con Git. Todo lo que hacemos por terminal se puede hacer con clics.

## Acceder al panel de Git

El icono de **Source Control** está en la barra lateral izquierda (parece una rama bifurcada).

**Atajo de teclado:** `Ctrl + Shift + G`

```
┌─────────────────────────────────────────────┐
│  📁 Explorer                                │
│  🔍 Search                                  │
│  🌿 Source Control  ◄── Este es Git        │
│  🐛 Run and Debug                           │
│  🧩 Extensions                              │
└─────────────────────────────────────────────┘
```

---

## Equivalencias Terminal ↔ GUI

| Terminal | Antigravity GUI |
|----------|-----------------|
| `git status` | Ver panel Source Control (cambios listados) |
| `git add archivo` | Clic en `+` junto al archivo |
| `git add --all` | Clic en `+` en "Changes" |
| `git commit -m "msg"` | Escribir mensaje + clic en ✓ (o `Ctrl+Enter`) |
| `git push` | Clic en `...` → Push (o icono de nube ↑) |
| `git pull` | Clic en `...` → Pull (o icono de nube ↓) |
| `git clone` | `Ctrl+Shift+P` → "Git: Clone" |

---

## Ver el estado (equivalente a `git status`)

Al abrir el panel de Source Control, verás los archivos organizados:

```
SOURCE CONTROL
──────────────────────────────
📝 Message (mensaje del commit)
[                            ]
──────────────────────────────
▼ Changes (3)                    ← Archivos modificados
   M  index.html                 ← Modified
   M  styles.css
   U  nuevo.js                   ← Untracked (nuevo)
──────────────────────────────
▼ Staged Changes (1)             ← Ya añadidos (staging)
   A  otro-archivo.js            ← Added
```

**Iconos de estado:**
- `M` - Modified (modificado)
- `U` - Untracked (nuevo, no trackeado)
- `A` - Added (añadido al staging)
- `D` - Deleted (eliminado)
- `R` - Renamed (renombrado)

---

## Añadir archivos (equivalente a `git add`)

### Añadir un archivo específico
1. En la sección "Changes", pasa el ratón sobre el archivo
2. Clic en el icono `+` que aparece

```
▼ Changes
   M  index.html  [+] [↩] [📄]
                   │   │    │
                   │   │    └── Ver cambios
                   │   └─────── Descartar cambios
                   └─────────── Añadir al staging
```

### Añadir todos los archivos
1. Pasa el ratón sobre el título "Changes"
2. Clic en el icono `+` general

```
▼ Changes (3)  [+]  ← Clic aquí para añadir todos
```

---

## Hacer commit (equivalente a `git commit`)

1. **Escribe el mensaje** en el cuadro de texto superior
2. **Pulsa el botón ✓** o usa `Ctrl + Enter`

```
SOURCE CONTROL
──────────────────────────────
📝 Añadir validación de email    ← Tu mensaje aquí
[        ✓ Commit            ]   ← Clic o Ctrl+Enter
──────────────────────────────
▼ Staged Changes (2)
   M  index.html
   A  validacion.js
```

> 💡 **Tip**: Si no hay archivos en "Staged Changes", Antigravity te preguntará si quieres añadir todo automáticamente.

---

## Push y Pull (sincronizar con GitHub)

### Método 1: Menú de tres puntos

Clic en `...` (menú) en la parte superior del panel:

```
┌─────────────────────────┐
│  Pull                   │  ← Traer cambios
│  Push                   │  ← Subir cambios
│  Clone                  │
│  ─────────────────────  │
│  Pull (Rebase)          │
│  Push to...             │
│  Sync                   │  ← Pull + Push
└─────────────────────────┘
```

### Método 2: Barra de estado inferior

En la barra inferior de Antigravity verás:

```
┌─────────────────────────────────────────────────────────────┐
│ 🌿 main   🔄 0↓ 2↑                                          │
│            │   │                                            │
│            │   └── Commits para subir (push)                │
│            └────── Commits para bajar (pull)                │
└─────────────────────────────────────────────────────────────┘
```

Clic en `🔄 0↓ 2↑` para sincronizar.

### Método 3: Iconos en el panel

Algunos temas muestran iconos de nube:
- `☁️↑` - Push
- `☁️↓` - Pull

---

## Clonar un repositorio (equivalente a `git clone`)

1. Abre la **Paleta de comandos**: `Ctrl + Shift + P`
2. Escribe "Git: Clone"
3. Pega la URL del repositorio
4. Selecciona la carpeta destino
5. Abre el proyecto clonado

```
> Git: Clone
  ────────────────────────────────────
  Paste repository URL:
  https://github.com/usuario/repo.git
```

**Alternativa:** Desde la pantalla de inicio de Antigravity, hay un botón "Clone Repository".

---

## Ver diferencias (equivalente a `git diff`)

1. En el panel Source Control, clic en un archivo modificado
2. Se abre una vista de comparación lado a lado

```
┌────────────────────────┬────────────────────────┐
│  index.html (original) │  index.html (cambios)  │
├────────────────────────┼────────────────────────┤
│  <h1>Hola</h1>         │  <h1>Hola Mundo</h1>   │
│                        │+ <p>Nuevo párrafo</p>  │
└────────────────────────┴────────────────────────┘
```

- **Líneas rojas**: Eliminadas
- **Líneas verdes**: Añadidas

---

## Ver historial de commits

### Método 1: Timeline
1. Abre un archivo
2. En el panel inferior, busca "TIMELINE"
3. Verás el historial de commits de ese archivo

### Método 2: Git Log en terminal integrado
1. Abre terminal: `` Ctrl + ` ``
2. Ejecuta: `git log --oneline`

### Método 3: Extensión Git History
Instala la extensión "Git History" para una vista más visual.

---

## Descartar cambios (equivalente a `git checkout -- archivo`)

Si quieres **deshacer cambios** en un archivo (volver a la última versión commiteada):

1. En el panel Source Control, busca el archivo
2. Clic en el icono `↩` (flecha curva)

```
▼ Changes
   M  index.html  [+] [↩]  ← Clic para descartar
```

> ⚠️ **Cuidado**: Esto elimina tus cambios sin posibilidad de recuperarlos.

---

## Flujo visual completo

```
1. Editas archivos
        │
        ▼
2. Panel Source Control muestra cambios
   ┌─────────────────┐
   │ ▼ Changes (3)   │
   │   M index.html  │
   │   M app.js      │
   │   U nuevo.css   │
   └─────────────────┘
        │
        ▼
3. Clic en [+] para añadir (staging)
   ┌─────────────────────┐
   │ ▼ Staged Changes (3)│
   │   M index.html      │
   │   M app.js          │
   │   A nuevo.css       │
   └─────────────────────┘
        │
        ▼
4. Escribir mensaje + Commit (✓)
   ┌─────────────────────────────┐
   │ "Añadir estilos responsive" │
   │ [        ✓ Commit         ] │
   └─────────────────────────────┘
        │
        ▼
5. Push (subir a GitHub)
   Menú ... → Push
   o clic en 🔄 0↓ 1↑
```

---

## Atajos de teclado útiles

| Atajo | Acción |
|-------|--------|
| `Ctrl + Shift + G` | Abrir panel Source Control |
| `Ctrl + Enter` | Commit (con mensaje escrito) |
| `Ctrl + Shift + P` → "Git:" | Ver todos los comandos Git |
| `` Ctrl + ` `` | Abrir terminal integrado |

---

## Ejercicios prácticos

### Ejercicio 1: Commit desde GUI
1. Modifica el archivo `index.html` del capítulo 1
2. Abre el panel Source Control
3. Añade el archivo al staging con `+`
4. Escribe un mensaje y haz commit

### Ejercicio 2: Ver diferencias
1. Modifica varios archivos
2. Haz clic en cada uno en el panel Source Control
3. Observa las diferencias lado a lado

### Ejercicio 3: Sincronizar
1. Haz un commit local
2. Observa que aparece `1↑` en la barra inferior
3. Haz push desde el menú `...`
4. Verifica en GitHub que los cambios están subidos

---

**Anterior:** [Apartado 1 - Terminal Básico](./01-terminal-basico.md)

**Siguiente:** [Apartado 3 - Comandos Avanzados](./03-comandos-avanzados.md)
