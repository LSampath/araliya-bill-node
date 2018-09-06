const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const UserRoute = require('./routes/user');
const SupplierRoute = require('./routes/supplier');

const UserController = require('./controller/user');

app.listen(3000, () => {
    console.log("Server is up on 3000");
});

// app.all('/*', (req, res, next) => {
//     if (req.url == '/user/auth') {
//         next();
//     } else {
//         UserController.validateToken(req.headers['authorization']).then((result) => {
//             console.log(result);
//            next();
//         }).catch((err) => {
//             res.status(401).send(err);
//         })
//     }
// });

app.use('/user', UserRoute);
app.use('/supplier', SupplierRoute);

app.get('/', (req, res) => {
    res.send('express server working....');
});
