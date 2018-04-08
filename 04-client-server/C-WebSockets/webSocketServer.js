#!/usr/bin/env node

//const mavlinkParser = require('./MavlinkWS.js');

const WebSocketServer = require('websocket').server;
const http = require('http');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const webSocketEmitter = new MyEmitter();
// webSocketEmitter.setMaxListeners(0);

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Received request for ${request.url}`);
  response.writeHead(404);
  response.end();
});
server.listen(8080, () => {
  console.log(`${new Date()} Server is listening on port 8080`);
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
const clients = [];
wsServer.on('request', (request) => {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  clients.push(connection);
  console.log(`Number of clients connected: ${clients.length}`);
  console.log(`${new Date()} Connection accepted.`);
  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      // console.log(`Received Message: ${message.utf8Data}`);
      // connection.sendUTF(`BB${message.utf8Data}`);
      // console.log(`Desde websocket emmiter ${message}`);
      webSocketEmitter.emit('message', message);
    } else if (message.type === 'binary') {
      console.log(`Received Binary Message of ${message.binaryData.length} bytes`);
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', (reasonCode, description) => {
    clients.splice(clients.indexOf(connection), 1);
    console.log(`Number of clients connected: ${clients.length}`);
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
  });
});

const sendMessage = (message) => {
  // let clientn = 0;
  clients.forEach((client) => {
    // clientn += 1;
    // console.log(`client ${clientn} message: ${message}`);
    client.sendUTF(message);
  });
};

// instanciamos el parser para la mavlink y le pasamos, la función
// para que pueda enviar mensajes por websockets el objeto que
// emitirá eventos cuando reciba cualquier mensaje por el WebSocket
const mavParser = new mavlinkParser.MavlinkWS(sendMessage, webSocketEmitter);