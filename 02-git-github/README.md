# Capítulo 2: Control de Versiones con Git y GitHub

## Objetivos

- Entender qué es el control de versiones y por qué es importante
- Dominar los comandos básicos de Git
- Usar Git desde la interfaz de Antigravity
- Colaborar en proyectos a través de GitHub

## Contenido

| Apartado | Archivo | Descripción |
|----------|---------|-------------|
| 1 | [01-terminal-basico.md](./01-terminal-basico.md) | Comandos de supervivencia: status, add, commit, push, pull, clone |
| 2 | [02-antigravity-gui.md](./02-antigravity-gui.md) | Las mismas operaciones desde la interfaz gráfica |
| 3 | [03-comandos-avanzados.md](./03-comandos-avanzados.md) | Ramas, merge, stash, log, diff, reset, revert |

## Progresión de aprendizaje

```
Apartado 1: Terminal
    │
    │  git status / add / commit / push / pull / clone
    │
    ▼
Apartado 2: Antigravity GUI
    │
    │  Las mismas operaciones con clics
    │  (entienden qué hace cada botón)
    │
    ▼
Apartado 3: Avanzados
    │
    │  branch / switch / merge / stash / log / diff
    │  reset / revert / resolver conflictos
    │
    ▼
¡Listos para colaborar!
```

## Requisitos previos

- [ ] Tener Git instalado (`git --version`)
- [ ] Cuenta en GitHub creada
- [ ] Antigravity instalado

### Instalar Git

**Windows:**
```
https://git-scm.com/download/win
```

**Mac:**
```bash
xcode-select --install
# o con Homebrew:
brew install git
```

**Linux:**
```bash
sudo apt install git  # Debian/Ubuntu
sudo dnf install git  # Fedora
```

## Configuración inicial

```bash
# Configurar identidad (obligatorio)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Configurar rama por defecto como 'main'
git config --global init.defaultBranch main

# Ver configuración actual
git config --list
```

## Cheatsheet rápido

### Comandos básicos
```bash
git status              # Ver estado
git add --all           # Añadir todo al staging
git commit -m "msg"     # Guardar cambios
git push                # Subir a GitHub
git pull                # Traer de GitHub
git clone <url>         # Descargar repositorio
```

### Ramas
```bash
git branch              # Ver ramas
git switch -c nombre    # Crear y cambiar
git merge rama          # Fusionar
```

### Deshacer
```bash
git restore archivo     # Descartar cambios
git stash               # Guardar temporalmente
git reset HEAD~1        # Deshacer último commit
```

## Flujo de trabajo diario

```bash
# Al empezar
git pull

# Trabajar...
# (editar archivos)

# Al terminar
git status
git add --all
git commit -m "Descripción clara"
git push
```

## Recursos adicionales

- [Pro Git Book (español)](https://git-scm.com/book/es/v2) - Libro oficial gratuito
- [GitHub Docs](https://docs.github.com/es) - Documentación de GitHub
- [Learn Git Branching](https://learngitbranching.js.org/?locale=es_ES) - Tutorial interactivo visual
- [Oh Shit, Git!?!](https://ohshitgit.com/es) - Soluciones a errores comunes

## Ejercicio final del capítulo

1. **Crea un repositorio** para el proyecto del curso
2. **Sube el código** del Capítulo 1 (HTML/CSS/JS)
3. **Activa GitHub Pages** para publicar tu web
4. **Comparte la URL** con un compañero
5. **Clona su repositorio** y propón una mejora vía Pull Request

---

**Anterior:** [Capítulo 1 - HTML, CSS, JavaScript](../01-html-css-js/)

**Siguiente:** [Capítulo 3 - Mapas con Leaflet](../03-leaflet/)
