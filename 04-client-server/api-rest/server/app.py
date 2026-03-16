from flask import Flask, jsonify, request
from flask_cors import CORS
from flasgger import Swagger
import argparse

app = Flask(__name__)
CORS(app)

swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": "apispec",
            "route": "/apispec.json",
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/apidocs/",
}

swagger_template = {
    "openapi": "3.0.0",
    "info": {
        "title": "API de Nombres",
        "description": "API REST sencilla para guardar y consultar un nombre",
        "version": "1.0.0",
    },
}

swagger = Swagger(app, config=swagger_config, template=swagger_template)

# Almacenamiento en memoria
datos = {"nombre": ""}


@app.route("/nombre", methods=["GET"])
def get_nombre():
    """Obtener el nombre almacenado
    ---
    responses:
      200:
        description: El nombre almacenado actualmente
        content:
          application/json:
            schema:
              type: object
              properties:
                nombre:
                  type: string
                  example: "María"
    """
    return jsonify(datos)


@app.route("/nombre", methods=["PUT"])
def put_nombre():
    """Establecer un nuevo nombre
    ---
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required:
              - nombre
            properties:
              nombre:
                type: string
                example: "María"
    responses:
      200:
        description: Nombre actualizado correctamente
        content:
          application/json:
            schema:
              type: object
              properties:
                nombre:
                  type: string
                mensaje:
                  type: string
      400:
        description: Petición incorrecta (falta el campo nombre)
    """
    body = request.get_json()
    if not body or "nombre" not in body:
        return jsonify({"error": "El campo 'nombre' es obligatorio"}), 400

    datos["nombre"] = body["nombre"]
    return jsonify({"nombre": datos["nombre"], "mensaje": "Nombre actualizado"})


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Servidor API de Nombres")
    parser.add_argument("--host", default="0.0.0.0", help="IP del servidor (default: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=5050, help="Puerto (default: 5050)")
    args = parser.parse_args()

    print(f" * Documentación OpenAPI en: http://{args.host}:{args.port}/apidocs/")
    app.run(host=args.host, port=args.port, debug=True)
