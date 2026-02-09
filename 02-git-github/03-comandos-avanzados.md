# Apartado 3: Comandos Avanzados de Git

Una vez dominas los básicos, estos comandos te ayudarán a trabajar de forma más profesional.

---

## 1. Ramas (Branches)

Las ramas permiten trabajar en funcionalidades nuevas sin afectar el código principal.

```
        main
          │
          ●──●──●──●──●  (código estable)
                   │
                   └──●──●──●  feature/login
                              (nueva funcionalidad)
```

### Crear y cambiar de rama

```bash
# Ver ramas existentes
git branch

# Crear nueva rama
git branch feature/login

# Cambiar a otra rama
git switch feature/login
# o el comando antiguo:
git checkout feature/login

# Crear y cambiar en un solo comando
git switch -c feature/login
# o:
git checkout -b feature/login
```

### Flujo típico con ramas

```bash
# 1. Partir desde main actualizado
git switch main
git pull

# 2. Crear rama para tu funcionalidad
git switch -c feature/mapa-drones

# 3. Trabajar y hacer commits...
git add --all
git commit -m "Añadir capa de drones"
git commit -m "Implementar actualización en tiempo real"

# 4. Subir la rama a GitHub
git push -u origin feature/mapa-drones

# 5. Cuando esté lista, fusionar con main
git switch main
git merge feature/mapa-drones

# 6. Subir main actualizado
git push

# 7. (Opcional) Eliminar rama
git branch -d feature/mapa-drones
```

---

## 2. Merge (Fusionar ramas)

Une los cambios de una rama en otra.

```bash
# Estar en la rama destino
git switch main

# Fusionar otra rama
git merge feature/login
```

### Tipos de merge

**Fast-forward** (sin conflictos, historial lineal):
```
main:     A──B──C
                 ↘
feature:          D──E

Después del merge:
main:     A──B──C──D──E
```

**Merge commit** (historiales divergentes):
```
main:     A──B──C──F
                 ↗
feature:      D──E

Después del merge:
main:     A──B──C──F──G (commit de merge)
               ↘   ↗
                D──E
```

---

## 3. Resolver conflictos

Cuando dos personas modifican las mismas líneas:

```bash
git merge feature/login
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html
# Automatic merge failed; fix conflicts and then commit.
```

**El archivo con conflicto se verá así:**

```html
<h1>
<<<<<<< HEAD
  Bienvenido a DroneApp
=======
  Bienvenido al Sistema de Drones
>>>>>>> feature/login
</h1>
```

**Pasos para resolver:**

1. **Editar el archivo** - Elegir qué versión quieres (o combinar ambas)
2. **Eliminar los marcadores** (`<<<<<<<`, `=======`, `>>>>>>>`)
3. **Guardar** el archivo
4. **Añadir y commitear**:

```bash
git add index.html
git commit -m "Resolver conflicto en título"
```

**En Antigravity**: Los conflictos se muestran con botones para aceptar uno u otro cambio.

---

## 4. Git Stash (Guardar temporalmente)

Guarda cambios sin hacer commit. Útil cuando necesitas cambiar de rama rápidamente.

```bash
# Guardar cambios temporalmente
git stash

# Tu directorio ahora está limpio
git status  # "nothing to commit"

# Cambiar de rama, hacer otra cosa...
git switch main
git pull

# Volver y recuperar los cambios
git switch mi-rama
git stash pop

# Ver lista de stashes guardados
git stash list

# Aplicar un stash específico (sin eliminarlo)
git stash apply stash@{0}

# Eliminar todos los stashes
git stash clear
```

**Caso de uso típico:**
```bash
# Estás trabajando y te piden revisar algo urgente
git stash                      # Guardar trabajo actual
git switch main
git pull                       # Revisar lo urgente
# ... revisas ...
git switch mi-rama
git stash pop                  # Recuperar tu trabajo
```

---

## 5. Git Log (Ver historial)

```bash
# Historial completo
git log

# Historial compacto (una línea por commit)
git log --oneline

# Historial con gráfico de ramas
git log --oneline --graph --all

# Últimos N commits
git log -5

# Historial de un archivo específico
git log -- index.html

# Buscar commits por mensaje
git log --grep="login"

# Ver qué cambió en cada commit
git log -p
```

**Ejemplo de `git log --oneline --graph --all`:**
```
* 3a4b5c6 (HEAD -> main) Merge feature/login
|\
| * 2b3c4d5 (feature/login) Añadir validación
| * 1a2b3c4 Crear formulario login
|/
* 9z8y7x6 Commit inicial
```

---

## 6. Git Diff (Ver diferencias)

```bash
# Ver cambios no añadidos al staging
git diff

# Ver cambios añadidos al staging
git diff --staged

# Comparar dos commits
git diff abc123 def456

# Comparar con rama
git diff main..feature/login

# Ver solo nombres de archivos modificados
git diff --name-only
```

---

## 7. Deshacer cambios

### Descartar cambios en un archivo (no commiteado)

```bash
# Volver al último commit (CUIDADO: pierdes cambios)
git checkout -- archivo.html

# Forma moderna
git restore archivo.html
```

### Quitar del staging (sin perder cambios)

```bash
git restore --staged archivo.html
# o el antiguo:
git reset HEAD archivo.html
```

### Deshacer último commit (manteniendo cambios)

```bash
# Los cambios vuelven al staging
git reset --soft HEAD~1

# Los cambios vuelven al working directory
git reset HEAD~1

# PELIGRO: Elimina commit Y cambios
git reset --hard HEAD~1
```

### Revertir un commit (de forma segura)

Crea un nuevo commit que deshace los cambios (no modifica historial):

```bash
git revert abc1234
```

```
Antes:  A──B──C (C tiene un bug)
Después: A──B──C──D (D deshace C)
```

---

## 8. Git Remote (Gestionar remotos)

```bash
# Ver remotos configurados
git remote -v

# Añadir remoto
git remote add origin https://github.com/user/repo.git

# Cambiar URL del remoto
git remote set-url origin https://github.com/user/nuevo-repo.git

# Eliminar remoto
git remote remove origin
```

---

## Resumen de comandos avanzados

| Comando | Descripción |
|---------|-------------|
| `git branch nombre` | Crear rama |
| `git switch rama` | Cambiar de rama |
| `git switch -c rama` | Crear y cambiar |
| `git merge rama` | Fusionar rama |
| `git stash` | Guardar temporalmente |
| `git stash pop` | Recuperar stash |
| `git log --oneline` | Historial compacto |
| `git log --graph --all` | Historial con gráfico |
| `git diff` | Ver diferencias |
| `git restore archivo` | Descartar cambios |
| `git reset HEAD~1` | Deshacer último commit |
| `git revert hash` | Revertir commit (seguro) |

---

## Flujo de trabajo profesional (Git Flow simplificado)

```
main ────●────────────●────────────●──── (producción, estable)
          \          /            /
           \        /            /
feature ────●──●──●─────────────/
                   \           /
                    \         /
bugfix ──────────────●──●────/
```

1. **main**: Código estable, desplegado
2. **feature/xxx**: Nueva funcionalidad
3. **bugfix/xxx**: Corrección de errores

```bash
# Nueva funcionalidad
git switch main
git pull
git switch -c feature/nueva-funcionalidad
# ... trabajar ...
git push -u origin feature/nueva-funcionalidad
# Crear Pull Request en GitHub
# Merge a main

# Corrección urgente
git switch main
git pull
git switch -c bugfix/error-login
# ... arreglar ...
git push -u origin bugfix/error-login
# Merge rápido a main
```

---

## Ejercicios prácticos

### Ejercicio 1: Trabajar con ramas
1. Crea una rama `feature/mejoras-css`
2. Haz varios commits con cambios de estilos
3. Vuelve a `main` y fusiona la rama

### Ejercicio 2: Simular conflicto
1. En `main`, modifica la línea 1 de un archivo
2. Crea una rama y modifica la misma línea de otra forma
3. Intenta hacer merge y resuelve el conflicto

### Ejercicio 3: Usar stash
1. Empieza a modificar archivos (sin commit)
2. Usa `git stash` para guardar
3. Cambia a otra rama, haz algo
4. Vuelve y recupera con `git stash pop`

### Ejercicio 4: Explorar historial
1. Usa `git log --oneline --graph --all` para ver el historial
2. Identifica merges y ramas en el gráfico
3. Usa `git diff` para comparar dos commits

---

**Anterior:** [Apartado 2 - Antigravity GUI](./02-antigravity-gui.md)

**Volver a:** [README del Capítulo](./README.md)
