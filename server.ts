import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Ensure db.json is in the root
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());

server.use(middlewares);
server.use(router);

// Explicitly set port 10001
const port = 10001;
console.log(`JSON Server is running on port ${port}`);

server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});
