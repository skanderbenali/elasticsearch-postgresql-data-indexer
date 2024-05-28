import dotenv from 'dotenv';
//DO NOT COMMIT YOUR .env FILE
dotenv.config({path: 'app.env'});
import {Config, ElasticConfig} from './types';
import process from "process";
import fs from "fs";


const buildElkConf = (): ElasticConfig => {
  const elkConf : ElasticConfig = {node: process.env.ELK_HOST || 'https://localhost:9200', index: process.env.ELK_TMAPS_INDEX || 'index'}
  if (process.env.ELK_USERNAME && process.env.ELK_PASSWORD){
    elkConf['auth']  = {
      username: process.env.ELK_USERNAME || 'elastic',
      password: process.env.ELK_PASSWORD || 'elastic',
    }
  }
  if(process.env.ELK_CA_FILE_PATH){
    elkConf['tls'] = {
      ca: process.env.ELK_CA_FILE_PATH ? fs.readFileSync(process.env.ELK_CA_FILE_PATH) : '',
      rejectUnauthorized: false
    }
  }
  return elkConf;
};
export const config: Config = {
  serviceName: process.env.SERVICENAME || 'Data Indexer',
  port: Number(process.env.PORT) || 3000,
  loggerLevel: process.env.LOGGER_LEVEL || 'error',
  db: {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB || 'database',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    max: Number(process.env.DB_MAX_CLIENTS) || 20,
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS) || 30000,
  },
  elasticConfig: buildElkConf()
};

