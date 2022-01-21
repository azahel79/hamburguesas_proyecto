const Server = require("./model/server");
const server = new Server();


server.listen();
server.middlewares();
server.servers();

