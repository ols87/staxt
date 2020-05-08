import dotenv from 'dotenv';

const config = dotenv.config();

if (config.error) {
  throw config.error;
}

const { parsed: envConfig } = config;

export default envConfig;
