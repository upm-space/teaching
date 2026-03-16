# WebSocket - Contador en tiempo real

Un contador que se incrementa cada décima de segundo. Desde una página web se puede **arrancar**, **parar** y **resetear**. Todos los clientes conectados ven el mismo contador sincronizado en tiempo real.

## Diferencia con la API REST

| API REST | WebSocket |
|---|---|
| El cliente pide datos → el servidor responde | La conexión queda abierta permanentemente |
| Cada petición es independiente | Ambos lados pueden enviar mensajes en cualquier momento |
| Ideal para consultas puntuales (CRUD) | Ideal para datos en tiempo real (contadores, chats, juegos) |

En este ejemplo, el servidor envía el valor del contador **10 veces por segundo** a todos los clientes conectados. Con REST, el cliente tendría que hacer 10 peticiones GET por segundo (polling), lo cual es mucho menos eficiente.

## Estructura

```
websocket/
├── server/
│   ├── app.py              ← Servidor WebSocket
│   └── requirements.txt
├── client/
│   └── index.html           ← Cliente web
└── README.md
```

---

## 1. Preparar el servidor

### 1.1 Abrir una terminal y entrar en la carpeta del servidor

```bash
cd websocket/server
```

### 1.2 Crear y activar el entorno virtual

```bash
python3 -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows CMD
# venv\Scripts\Activate.ps1     # Windows PowerShell
```

### 1.3 Instalar las dependencias

```bash
pip install -r requirements.txt
```

Solo se instala **websockets**, una librería ligera para WebSockets en Python.

### 1.4 Arrancar el servidor

```bash
python app.py
```

Salida esperada:

```
Servidor WebSocket escuchando en ws://0.0.0.0:8765
```

> Puedes cambiar el puerto: `python app.py --port 9000`

---

## 2. Usar el cliente web

1. Abre `client/index.html` directamente en el navegador.
2. Configura la **IP** y el **puerto** del servidor (por defecto `localhost:8765`).
3. Pulsa **Conectar**.
4. Usa los botones:
   - **Arrancar**: el contador empieza a subir.
   - **Parar**: se detiene (sin perder el valor).
   - **Resetear**: vuelve a 0 y se detiene.

> Puedes abrir varias pestañas del cliente: todas verán el mismo contador sincronizado.

---

## 3. El protocolo de mensajes

### Cliente → Servidor

```json
{ "action": "start" }
{ "action": "stop" }
{ "action": "reset" }
```

### Servidor → Cliente

```json
{ "type": "update", "counter": 3.5 }
{ "type": "status", "running": true }
{ "type": "reset", "counter": 0.0, "running": false }
```

---

## 4. Resumen de comandos

```bash
# Solo la primera vez
cd websocket/server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Cada vez que quieras arrancar
source venv/bin/activate
python app.py
# Ctrl+C para parar
deactivate
```
