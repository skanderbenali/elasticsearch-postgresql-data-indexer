export interface Config {
    serviceName: string;
    port: number;
    loggerLevel: string;
    db: PgConfig;
    elasticConfig: ElasticConfig;

}

// dbUtils
export interface PgConfig {
    user: string;
    database: string;
    password: string;
    host: string;
    port: number;
    max: number;
    idleTimeoutMillis: number;
}

export interface ElasticConfig {
    node: string;
    index: string;
    auth?: ElasticAuth,
    tls?: ElasticTls
}

export interface ElasticAuth{
    username: string;
    password: string;
}

export interface ElasticTls{
  ca: any;
  rejectUnauthorized: boolean;
}
