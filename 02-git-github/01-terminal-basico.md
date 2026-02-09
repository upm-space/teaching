# Apartado 1: Comandos Básicos de Git (Terminal)

## ¿Qué es Git?

Git es un **sistema de control de versiones** que permite:
- Guardar "fotos" (snapshots) de tu código en diferentes momentos
- Volver atrás si algo se rompe
- Trabajar en equipo sin pisarse
- Tener un historial completo de cambios

## Conceptos clave

```
┌─────────────────────────────────────────────────────────────┐
│                    TU ORDENADOR                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │  Directorio  │───▶│    Staging   │───▶│ Repositorio  │   │
│  │  de trabajo  │    │     Area     │    │    Local     │   │
│  │  (Working)   │add │   (Index)    │commit   (.git)    │   │
│  └──────────────┘    └──────────────┘    └──────────────┘   │
│                                                 │            │
└─────────────────────────────────────────────────│────────────┘
                                                  │ push / pull
                                          ┌───────▼───────┐
                                          │    GitHub     │
                                          │   (Remoto)    │
                                          └───────────────┘
```

- **Working Directory**: Los archivos que ves y editas
- **Staging Area**: Archivos preparados para el próximo commit
- **Repositorio Local**: Historial de commits en tu máquina
- **Repositorio Remoto**: Copia en GitHub (u otro servidor)

---

## Configuración inicial (solo una vez)

```bash
# Configurar tu identidad
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Verificar configuración
git config --list
```

---

## Comandos de supervivencia

### 1. `git status` - Ver el estado actual

El comando más usado. Te dice qué archivos han cambiado.

```bash
git status
```

**Ejemplo de salida:**
```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   index.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        nuevo-archivo.js
```

**Interpretación:**
- `modified`: Archivo existente que has modificado
- `Untracked files`: Archivos nuevos que Git no conoce todavía

---

### 2. `git add` - Preparar archivos para commit

Mueve archivos al **Staging Area**.

```bash
# Añadir un archivo específico
git add index.html

# Añadir varios archivos
git add index.html styles.css script.js

# Añadir todos los archivos modificados y nuevos
git add --all
# o su forma corta:
git add .
```

> ⚠️ **Nota**: `git add .` añade TODO. Asegúrate de tener un buen `.gitignore` para no subir archivos sensibles (.env) o innecesarios (node_modules/).

---

### 3. `git commit` - Guardar los cambios

Crea un "snapshot" con los archivos del Staging Area.

```bash
# Commit con mensaje en línea
git commit -m "Añadir formulario de contacto"

# Commit con mensaje multilínea (se abre editor)
git commit
```

**Buenos mensajes de commit:**
```bash
# ✅ Buenos
git commit -m "Añadir validación de email en formulario"
git commit -m "Corregir error de cálculo en distancia"
git commit -m "Actualizar estilos del header"

# ❌ Malos
git commit -m "Cambios"
git commit -m "asdf"
git commit -m "WIP"
```

**Atajo útil** - Add + Commit en uno (solo para archivos ya trackeados):
```bash
git commit -am "Mensaje del commit"
```

---

### 4. `git push` - Subir cambios a GitHub

Envía tus commits locales al repositorio remoto.

```bash
# Push normal (si ya está configurado el upstream)
git push

# Primera vez o para establecer upstream
git push -u origin main
```

**Flujo típico:**
```bash
git status                    # Ver qué ha cambiado
git add --all                 # Preparar todo
git commit -m "Mi mensaje"    # Guardar localmente
git push                      # Subir a GitHub
```

---

### 5. `git clone` - Descargar un repositorio

Copia un repositorio remoto a tu máquina.

```bash
# Clonar usando HTTPS
git clone https://github.com/usuario/repositorio.git

# Clonar en una carpeta específica
git clone https://github.com/usuario/repositorio.git mi-carpeta
```

Esto crea una carpeta con todo el código y el historial completo.

---

### 6. `git pull` - Traer cambios de GitHub

Descarga y fusiona los cambios del remoto.

```bash
git pull
```

**¿Cuándo usarlo?**
- Al empezar a trabajar (por si alguien subió cambios)
- Antes de hacer push (para evitar conflictos)
- Cuando GitHub te dice que hay cambios nuevos

---

## Flujo de trabajo diario

```bash
# 1. Al empezar a trabajar
git pull                      # Traer últimos cambios

# 2. Trabajar en tu código...
#    (editas archivos, creas nuevos, etc.)

# 3. Ver qué has cambiado
git status

# 4. Preparar los cambios
git add --all

# 5. Guardar con mensaje descriptivo
git commit -m "Implementar función de login"

# 6. Subir a GitHub
git push
```

---

## Crear un repositorio nuevo

### Opción A: Empezar desde cero en local

```bash
# 1. Crear carpeta y entrar
mkdir mi-proyecto
cd mi-proyecto

# 2. Inicializar Git
git init

# 3. Crear algunos archivos
echo "# Mi Proyecto" > README.md

# 4. Primer commit
git add --all
git commit -m "Commit inicial"

# 5. Conectar con GitHub (crear repo en GitHub primero)
git remote add origin https://github.com/tu-usuario/mi-proyecto.git
git push -u origin main
```

### Opción B: Clonar repositorio existente

```bash
# 1. Clonar
git clone https://github.com/usuario/repositorio.git

# 2. Entrar en la carpeta
cd repositorio

# 3. ¡Ya puedes trabajar!
```

---

## Resumen de comandos

| Comando | Descripción |
|---------|-------------|
| `git status` | Ver estado actual |
| `git add <archivo>` | Añadir archivo al staging |
| `git add --all` | Añadir todos los cambios |
| `git commit -m "msg"` | Guardar cambios con mensaje |
| `git push` | Subir a GitHub |
| `git pull` | Traer cambios de GitHub |
| `git clone <url>` | Descargar repositorio |
| `git log --oneline` | Ver historial de commits |

---

## Ejercicios prácticos

### Ejercicio 1: Primer repositorio
1. Crea una carpeta `prueba-git`
2. Inicializa Git con `git init`
3. Crea un archivo `hola.txt` con algún texto
4. Haz tu primer commit

### Ejercicio 2: Conectar con GitHub
1. Crea un repositorio en GitHub (vacío)
2. Conecta tu repo local con `git remote add origin <url>`
3. Sube tus cambios con `git push -u origin main`

### Ejercicio 3: Clonar y modificar
1. Clona el repositorio de un compañero
2. Añade un archivo con tu nombre
3. Haz commit y push

---

## Errores comunes y soluciones

### "fatal: not a git repository"
No estás dentro de un repositorio Git. Usa `git init` o `cd` a la carpeta correcta.

### "error: failed to push some refs"
Alguien subió cambios antes que tú. Solución:
```bash
git pull
# Resolver conflictos si los hay
git push
```

### "Please tell me who you are"
No has configurado tu identidad:
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

**Siguiente:** [Apartado 2 - Git desde Antigravity](./02-antigravity-gui.md)
