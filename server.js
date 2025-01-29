const http = require('http');
const app = require('./app');

const numPort =3006;

const server = http.createServer(app);

const date = new Date();

app.set("port",numPort);

server.listen(3006, () => {
    console.log(date.toLocaleDateString()," ", date.toLocaleTimeString());
    console.log("Le serveur est activé au port :" ,numPort);
});
