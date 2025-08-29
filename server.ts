import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Make sure db.json is in the root
const middlewares = jsonServer.defaults();

// Enable CORS
server.use(cors());

server.use(middlewares);
server.use(router);

server.listen(process.env.PORT || 10001, () => {
  console.log('JSON Server is running on port', process.env.PORT || 10001);
});
