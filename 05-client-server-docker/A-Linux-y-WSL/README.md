# A - Linux y WSL

## 1. ¿Por qué Linux?

La inmensa mayoría de los servidores del mundo (la nube de Amazon, Google, Netflix, tu banco...) ejecutan **Linux**. Docker nació en Linux y, aunque hoy funciona también en Mac y Windows, por dentro sigue siendo Linux.

Por tanto, **aprender a moverse en una terminal Linux es un requisito**, no una opción, para cualquier desarrollador moderno.

## 2. ¿Qué es WSL?

**Windows Subsystem for Linux** (WSL) es una característica de Windows 10/11 que permite ejecutar un Linux "de verdad" dentro de Windows, sin máquinas virtuales ni dual boot. Es la forma recomendada de trabajar con Docker si tu equipo es Windows.

> Si usas **macOS** o **Linux nativo** puedes saltarte la sección de instalación de WSL y pasar directamente a los comandos.

## 3. Instalación de WSL (solo Windows)

### 3.1 Instalación rápida (Windows 10 2004+ o Windows 11)

Abre **PowerShell como administrador** y ejecuta:

```powershell
wsl --install
```

Este comando:

- Activa las características de Windows necesarias.
- Descarga el kernel de Linux.
- Instala **Ubuntu** por defecto.

Reinicia cuando termine. Al volver a arrancar, Ubuntu te pedirá crear un usuario y contraseña (¡apúntalos!).

### 3.2 Instalación manual (versiones más antiguas)

1. Habilitar la característica WSL:
   ```powershell
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   ```

2. Habilitar la plataforma de máquina virtual:
   ```powershell
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```

3. Reiniciar.

4. Descargar e instalar el [paquete de actualización del kernel de WSL2](https://aka.ms/wsl2kernel).

5. Establecer WSL2 como versión por defecto:
   ```powershell
   wsl --set-default-version 2
   ```

6. Instalar Ubuntu desde la Microsoft Store.

### 3.3 Comprobar la instalación

```powershell
wsl -l -v
```

Debes ver algo como:

```
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

## 4. Primer contacto con la terminal

Abre Ubuntu (o el terminal de tu Mac/Linux). Verás algo así:

```
luis@mi-portatil:~$
```

Eso es el **prompt**. Significa: "estoy listo para recibir órdenes".

### 4.1 Comandos imprescindibles

| Comando | Qué hace | Ejemplo |
|---|---|---|
| `pwd` | Dice en qué carpeta estás | `pwd` → `/home/luis` |
| `ls` | Lista archivos y carpetas | `ls -la` |
| `cd` | Cambia de carpeta | `cd /tmp`, `cd ..`, `cd ~` |
| `mkdir` | Crea una carpeta | `mkdir proyecto` |
| `touch` | Crea un archivo vacío | `touch hola.txt` |
| `cat` | Muestra el contenido de un archivo | `cat hola.txt` |
| `nano` | Editor de texto básico | `nano hola.txt` |
| `cp` | Copia archivos | `cp a.txt b.txt` |
| `mv` | Mueve o renombra | `mv a.txt carpeta/` |
| `rm` | Borra archivos | `rm a.txt` |
| `rm -rf` | Borra carpetas (¡cuidado!) | `rm -rf carpeta` |
| `clear` | Limpia la pantalla | `clear` |
| `history` | Comandos anteriores | `history` |

### 4.2 Rutas

- `/` → raíz del sistema
- `~` → tu carpeta personal (`/home/tu-usuario`)
- `.` → carpeta actual
- `..` → carpeta padre

### 4.3 Permisos: `sudo`

Algunos comandos afectan al sistema entero y requieren privilegios de administrador. Se usa `sudo` delante:

```bash
sudo apt update
sudo apt install curl
```

Te pedirá la contraseña de tu usuario (la que pusiste al instalar Ubuntu).

### 4.4 Instalar software: `apt`

En Ubuntu/Debian, el gestor de paquetes es `apt`:

```bash
sudo apt update                 # actualiza la lista de paquetes
sudo apt upgrade                # actualiza los paquetes instalados
sudo apt install <paquete>      # instala algo
sudo apt remove <paquete>       # lo desinstala
```

## 5. Ejercicio guiado

Vamos a crear una carpeta, entrar en ella, crear un archivo y leerlo:

```bash
cd ~
mkdir practica-linux
cd practica-linux
echo "Hola desde Linux" > saludo.txt
cat saludo.txt
ls -la
pwd
```

Deberías ver en pantalla:

```
Hola desde Linux
```

Y con `ls -la` la lista de archivos con sus permisos y fechas.

## 6. Trucos útiles

- **Tab** autocompleta nombres de archivo y comandos. Úsalo siempre.
- **Flechas arriba/abajo** navegan por el histórico de comandos.
- **Ctrl+C** cancela el comando actual.
- **Ctrl+L** limpia la pantalla (equivalente a `clear`).
- **Ctrl+R** busca en el histórico.
- Para pegar en la terminal de Windows: **botón derecho** o **Ctrl+Shift+V**.

## 7. Acceder a los archivos de Windows desde WSL

Tus unidades de Windows están montadas en `/mnt/`:

```bash
cd /mnt/c/Users/tu-usuario/Desktop
```

Aunque para proyectos **se recomienda trabajar dentro del sistema de archivos de Linux** (`~/proyectos/…`), porque es mucho más rápido con Docker.

## Siguiente paso

Ya tienes una terminal Linux operativa. En la siguiente sección instalaremos Docker: [B-Docker-basico](../B-Docker-basico).
