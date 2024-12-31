const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5005 });

wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');

    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        const data = JSON.parse(message);

        // Reenviar la señal a todos los clientes excepto al remitente
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

console.log('Servidor WebSocket escuchando en el puerto 5005'); 