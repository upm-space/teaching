# Docker

## Capítulo 1: Instalar Docker desde WSL

### 1.1 ¿Qué es WSL?

Windows Subsystem for Linux (WSL) es una característica innovadora en Windows 10 y Windows 11 que permite a los usuarios ejecutar un entorno de GNU/Linux directamente en Windows, sin la necesidad de configurar una máquina virtual o dual-boot. Esto facilita la ejecución de herramientas de desarrollo Linux en un entorno Windows, proporcionando lo mejor de ambos mundos para el desarrollo de software y la administración de sistemas.

### 1.2 Instalación de WSL

**Pasos para instalar WSL en Windows 10:**

1. **Habilitar la característica WSL:**
   - Abre PowerShell como administrador.
   - Ejecuta el siguiente comando:
     ```
     dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
     ```
   - Reinicia tu computadora.

2. **Actualizar a WSL 2 (opcional pero recomendado):**
   - Asegúrate de que tu versión de Windows soporte WSL 2.
   - Ejecuta en PowerShell como administrador:
     ```
     dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
     ```
   - Reinicia tu computadora.
   - Descarga y ejecuta el paquete de actualización del kernel de Linux desde el sitio oficial de Microsoft.

3. **Instalar una distribución de Linux desde la Microsoft Store:**
   - Abre Microsoft Store y busca la distribución de Linux que prefieras, como Ubuntu, Debian, o Fedora.
   - Selecciona "Instalar" y sigue las instrucciones para configurar tu nuevo sistema Linux, incluyendo la creación de un usuario y contraseña.

### 1.3 Instalación de Docker en WSL

1. **Instalar Docker Desktop para Windows:**
   - Descarga Docker Desktop desde el sitio oficial de [Docker] (https://docs.docker.com/desktop/install/windows-install/).
   - Asegúrate de seleccionar la opción que incluye la integración con WSL 2 durante la instalación.

2. **Configuración de Docker para usar con WSL:**
   - Una vez instalado Docker Desktop, abre la aplicación.
   - Ve a Settings > Resources > WSL Integration.
   - Activa la integración con tu distribución Linux instalada.
   - Aplica los cambios.

3. **Verificar la instalación:**
   - Abre tu distribución de Linux desde la terminal.
   - Ejecuta `docker run hello-world` para verificar que Docker puede descargar y ejecutar imágenes.

### 1.4 Resumen del Capítulo

Este capítulo ha proporcionado una introducción a WSL, incluyendo cómo se instala y se configura junto con Docker, permitiendo a los estudiantes preparar su entorno Windows para el desarrollo y despliegue de aplicaciones en contenedores.

## Capítulo 2: Ejemplos básicos para bajarse un docker y arrancarlo

### 2.1 Descargar y ejecutar una imagen Docker

- **Comando para descargar una imagen desde Docker Hub:**
  - Utiliza el siguiente comando para descargar la imagen de, por ejemplo, Nginx:
    ```
    docker pull nginx
    ```

- **Comando para ejecutar un contenedor Docker:**
  - Una vez descargada la imagen, puedes ejecutar un contenedor usando:
    ```
    docker run -p 80:80 nginx
    ```

### 2.2 Interacción básica con Docker

- **Verificar el estado de los contenedores:**
  - Para ver los contenedores activos, usa:
    ```
    docker ps
    ```

- **Acceder a los logs de un contenedor:**
  - Para ver los logs de un contenedor específico, ejecuta:
    ```
    docker logs [CONTAINER_ID]
    ```

## Capítulo 3: Ejemplo básico para la creación de un Dockerfile con una aplicación en Flask

### 3.1 Creación del entorno Flask

- **Explicación breve sobre Flask:**
  - Flask es un framework de desarrollo web en Python que permite crear aplicaciones de forma rápida y con poco código.

- **Creación de un archivo `app.py` para un "Hola Mundo" en Flask:**
  ```python
  from flask import Flask

  app = Flask(__name__)

  @app.route('/')
  def hello_world():
      return 'Hola Mundo!'

  if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5000)

   ```
## 3.2 Dockerfile
**Estructura de un Dockerfile:**

```
FROM python:3.8-slim
WORKDIR /app
COPY . /app
RUN pip install flask
EXPOSE 5000
CMD ["python", "app.py"]
```




- El siguiente Dockerfile configura un entorno Python y ejecuta la aplicación Flask:

- **Construcción y ejecución del Dockerfile:**

   - Construye la imagen con:
```
docker build -t flask-hola-mundo .
```
   - Ejecuta el contenedor con:

```
docker run -p 5000:5000 flask-hola-mundo
```

## Capítulo 4: Uso de Docker Compose con la aplicación Flask

### 4.1 Introducción a Docker Compose

Docker Compose es una herramienta para definir y ejecutar aplicaciones multi-contenedor. Facilita la configuración de servicios relacionados, como bases de datos y servidores web, en un único archivo YAML. Esto permite a los desarrolladores y administradores de sistemas configurar entornos complejos con un solo comando, asegurando la consistencia a través de diferentes entornos de despliegue y desarrollo.

### 4.2 Creación del archivo `docker-compose.yml`

El archivo `docker-compose.yml` para nuestra aplicación Flask define los servicios necesarios y las configuraciones de red. A continuación, se muestra cómo estructurar este archivo para nuestra simple aplicación "Hola Mundo":

**Archivo `docker-compose.yml`:**

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"
```

Este archivo de configuración dice a Docker Compose cómo construir el entorno:

- version: Define la versión de la sintaxis de Docker Compose.
- services: Define los servicios que componen la aplicación (en este caso, solo web).
- build: Instruye a Docker Compose a construir la imagen del directorio actual.
- ports: Mapea el puerto 5000 del contenedor al puerto 5000 del host, permitiendo que la aplicación sea accesible externamente.

## 4.3 Ejecución usando Docker Compose
Para poner en marcha la aplicación Flask utilizando Docker Compose, sigue los pasos detallados a continuación. Esto te permitirá iniciar y gestionar tu aplicación de manera fácil y eficiente.

**Ejecutar la aplicación:**

Para levantar todos los servicios definidos en tu archivo docker-compose.yml, ejecuta el siguiente comando en la terminal:

```
docker-compose up

```

Este comando iniciará la instancia de Flask y la hará accesible en http://localhost:5000. Puedes visitar esta dirección en tu navegador para ver el mensaje "Hola Mundo!" de la aplicación Flask.

**Detener la aplicación:**

Para detener y remover todos los contenedores que Docker Compose ha iniciado, puedes usar el siguiente comando:




