const l = e => console.log(e);
const express = require('express');
const app = express();
const server = app.listen(3000, () => {});
app.use(express.static('public'));
const sock = require('socket.io')(server);

const mapa = new Map();

sock.on('connection', client => {
    l("Klient połączony: " + client.id);

    client.on('czas', aktGodzina => {
        mapa.set(client.id, aktGodzina);
        l(`Klient ${client.id} - ${aktGodzina}`);
        sock.sockets.emit('akt', Array.from(mapa));
    });

    client.on('disconnect', () => {
        l("Klient rozłączony: " + client.id);
        mapa.delete(client.id);
        sock.sockets.emit('akt', Array.from(mapa)); 
    });
});
