const express = require("express");
const serveStatic = require("serve-static");
const compression = require('compression')

app = express();
app.use(compression());
app.use(serveStatic(__dirname + "/dist"));
let port = process.env.PORT || 5000;
app.listen(port);
console.log("server started " + port);
