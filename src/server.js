import ServerConfig from '../configs/serverConfig.js';
import app from './app.js';
import '../configs/databaseConfig.js';

app.listen(ServerConfig.port, () => {
  console.log(
    `Local is running: ${ServerConfig.host_url}`
  );
});
