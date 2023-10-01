import ServerConfig from '../configs/serverConfig.js';
import app from './app.js';

app.listen(ServerConfig.port, () => {
  console.log(
    `Local is running: ${ServerConfig.host_url}`
  );
});
