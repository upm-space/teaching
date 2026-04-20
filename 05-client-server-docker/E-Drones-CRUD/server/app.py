import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from bson.errors import InvalidId

MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://mongo:27017/')
DB_NAME = os.environ.get('DB_NAME', 'dronesdb')

app = Flask(__name__)
CORS(app)

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
drones = db['drones']


def serialize(drone):
    drone['id'] = str(drone['_id'])
    del drone['_id']
    return drone


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


@app.route('/api/drones', methods=['GET'])
def list_drones():
    result = [serialize(d) for d in drones.find()]
    return jsonify(result)


@app.route('/api/drones/<drone_id>', methods=['GET'])
def get_drone(drone_id):
    try:
        drone = drones.find_one({'_id': ObjectId(drone_id)})
    except InvalidId:
        return jsonify({'error': 'ID no válido'}), 400
    if not drone:
        return jsonify({'error': 'Dron no encontrado'}), 404
    return jsonify(serialize(drone))


@app.route('/api/drones', methods=['POST'])
def create_drone():
    data = request.get_json() or {}
    required = ['modelo', 'fabricante']
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({'error': f'Faltan campos: {", ".join(missing)}'}), 400

    drone = {
        'modelo': data.get('modelo'),
        'fabricante': data.get('fabricante'),
        'peso_kg': data.get('peso_kg'),
        'autonomia_min': data.get('autonomia_min'),
        'estado': data.get('estado', 'operativo'),
    }
    result = drones.insert_one(drone)
    drone['_id'] = result.inserted_id
    return jsonify(serialize(drone)), 201


@app.route('/api/drones/<drone_id>', methods=['PUT'])
def update_drone(drone_id):
    data = request.get_json() or {}
    data.pop('id', None)
    try:
        result = drones.update_one(
            {'_id': ObjectId(drone_id)},
            {'$set': data}
        )
    except InvalidId:
        return jsonify({'error': 'ID no válido'}), 400
    if result.matched_count == 0:
        return jsonify({'error': 'Dron no encontrado'}), 404
    drone = drones.find_one({'_id': ObjectId(drone_id)})
    return jsonify(serialize(drone))


@app.route('/api/drones/<drone_id>', methods=['DELETE'])
def delete_drone(drone_id):
    try:
        result = drones.delete_one({'_id': ObjectId(drone_id)})
    except InvalidId:
        return jsonify({'error': 'ID no válido'}), 400
    if result.deleted_count == 0:
        return jsonify({'error': 'Dron no encontrado'}), 404
    return jsonify({'deleted': drone_id})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
