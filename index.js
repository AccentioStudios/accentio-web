const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: true
}));
app.set('view engine', 'ejs');
console.log(`Package Name: ${process.env.npm_package_name}`);
console.log(`App mode: ${app.get('env')}`);
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(helmet()); // Sending various http headers

//Routing Web
require('./routes/web.routes.js')(app);
// API VERSION 1
require('./routes/api/v1/api.v1.routes')(app);

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));