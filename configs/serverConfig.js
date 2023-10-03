import dotenv from 'dotenv';
dotenv.config();

const { PORT, HOST, HOST_URL } = process.env;

if (!PORT) {
  throw new Error('PORT is required');
} else if (!HOST) {
  throw new Error('HOST is required');
}

const serverConfig = {
  port: PORT,
  host: HOST,
  host_url: HOST_URL,
};

export default serverConfig;
