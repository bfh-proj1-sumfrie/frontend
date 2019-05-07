const express = require("express");
const serveStatic = require("serve-static");
const compression = require("compression");
const history = require('connect-history-api-fallback');

app = express();
app.use(history())
app.use(compression());
app.use(serveStatic(__dirname + "/dist"));
let port = process.env.PORT || 5000;
app.listen(port);
console.log("server started " + port);
