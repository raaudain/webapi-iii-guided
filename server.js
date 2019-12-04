const express = require('express'); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// middleware
server.use(helmet());
server.use(express.json());
server.use(logger)

// custom middleware

function logger(req, res, next){
  console.log(`${req.method} to ${req.originalURL}`);

  next(); // Allows the request to continue to the next middleware or route handler
}

// write a gatekeeper middleware that reads a password from the headers and if the password is "mellon", let it continue
// if not, send back status code 401 and a message
function password(req, res, next){
  if(req.headers.password && req.headers.password.toLowerCase() === "mellon"){
    next();
  }
  else{
    res.status(401).send("Incorrect password");
  }
}

// endpoints
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get("/echo", (req, res) => {
  res.send(req.headers);
})

// You can use helmet on specific endpoints
server.get("/area51", helmet(), password, (req, res) => {
  res.send(req.headers);
})


module.exports = server;
