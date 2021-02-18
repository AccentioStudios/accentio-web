const https = require('https');
const fs = require('fs');
const path = require('path');
const clog = require('console-log-level')({ level: 'debug' });
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const app = express();
app.use(cors({
    origin: true
}));
app.set('views', path.resolve(__dirname, './resources/views'))
app.set('view engine', 'ejs');
clog.info(`Package Name: ${process.env.npm_package_name} v${process.env.npm_package_version}`);
clog.info(`App mode: ${process.env.NODE_ENV}`);
clog.info(`TLS Reject Unauthorized Request: ${parseInt(process.env.NODE_TLS_REJECT_UNAUTHORIZED, 10) !== 0}`);
clog.info('');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(helmet()); // Sending various http headers
app.enable('trust proxy');

app.use(express.static(__dirname + '/public'));

//Routing Web
require('./routes/web.routes.js')(app);
// API VERSION 1
require('./routes/api/v1/api.v1.routes')(app);


const port = process.env.PORT || 4555;
let server = https.createServer(app);
// switch (process.env.NODE_ENV) {
//   case 'development':
//     server = https.createServer({
//       key: fs.readFileSync(
//         path.resolve(process.env.SSL_DEV_KEY || './ssl/localhost.key')
//       ),
//       cert: fs.readFileSync(
//         path.resolve(process.env.SSL_DEV_CRT || './ssl/localhost.crt')
//       )
//     }, app);
//     break;
//   default:
//     server = https.createServer({
//       key: fs.readFileSync(
//         process.env.SSL_PDT_KEY || '/etc/nginx/ssl/domain.key'
//       ),
//       cert: fs.readFileSync(
//         process.env.SSL_PDT_CRT || '/etc/nginx/ssl/domain.crt'
//       ),
//       ca: fs.readFileSync(
//         process.env.SSL_PDT_CA || '/etc/nginx/ssl/domain.ca-bundle'
//       ),
//       requestCert: true,
//       rejectUnauthorized: false
//     }, app);
//     break;
// }

server.listen(port, () => clog.info(`Server corriendo en el puerto ${port}...`));
