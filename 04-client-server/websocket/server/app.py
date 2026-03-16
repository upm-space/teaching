import asyncio
import json
import argparse
from websockets.asyncio.server import serve

# Estado del contador
counter = 0.0
running = False


async def counter_loop(connected_clients):
    """Bucle que incrementa el contador cada 0.1 segundos y lo envía a todos los clientes."""
    global counter, running

    while True:
        if running:
            counter = round(counter + 0.1, 1)
            message = json.dumps({"type": "update", "counter": counter})
            # Enviar a todos los clientes conectados
            for ws in list(connected_clients):
                try:
                    await ws.send(message)
                except Exception:
                    connected_clients.discard(ws)
        await asyncio.sleep(0.1)


async def handle_client(websocket, connected_clients):
    """Gestiona la conexión de un cliente."""
    global counter, running

    connected_clients.add(websocket)
    print(f"Cliente conectado ({len(connected_clients)} activos)")

    # Enviar estado actual al conectarse
    await websocket.send(json.dumps({
        "type": "update",
        "counter": counter,
        "running": running,
    }))

    try:
        async for raw in websocket:
            msg = json.loads(raw)
            action = msg.get("action")

            if action == "start":
                running = True
                await broadcast(connected_clients, {"type": "status", "running": True})

            elif action == "stop":
                running = False
                await broadcast(connected_clients, {"type": "status", "running": False})

            elif action == "reset":
                running = False
                counter = 0.0
                await broadcast(connected_clients, {
                    "type": "reset",
                    "counter": 0.0,
                    "running": False,
                })
    except Exception:
        pass
    finally:
        connected_clients.discard(websocket)
        print(f"Cliente desconectado ({len(connected_clients)} activos)")


async def broadcast(clients, data):
    """Envía un mensaje JSON a todos los clientes conectados."""
    message = json.dumps(data)
    for ws in list(clients):
        try:
            await ws.send(message)
        except Exception:
            clients.discard(ws)


async def main(host, port):
    connected_clients = set()

    # Lanzar el bucle del contador en segundo plano
    asyncio.create_task(counter_loop(connected_clients))

    async with serve(
        lambda ws: handle_client(ws, connected_clients),
        host,
        port,
        origins=None,  # Permitir conexiones desde cualquier origen
    ):
        print(f"Servidor WebSocket escuchando en ws://{host}:{port}")
        await asyncio.Future()  # Mantener el servidor corriendo


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Servidor WebSocket - Contador")
    parser.add_argument("--host", default="0.0.0.0", help="IP del servidor (default: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=8765, help="Puerto (default: 8765)")
    args = parser.parse_args()

    asyncio.run(main(args.host, args.port))
