// websocket.js
const WebSocket = require('ws');

const startWebSocketServer = (strapi) => {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.on('message', (message) => {
            console.log('Received:', message);
            // Broadcast message to all clients
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    strapi.app.ws = wss;
};

module.exports = startWebSocketServer;