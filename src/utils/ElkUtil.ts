import { Client } from '@elastic/elasticsearch';
import {config} from "../config";
import { logger } from './../utils/logger';
import {ClusterHealthHealthResponseBody} from "@elastic/elasticsearch/lib/api/types";

const elkClient = new Client(config.elasticConfig)


logger.debug(`ELK Connection Settings: ${JSON.stringify(elkClient)}`);

export const getElasticClient = async (): Promise<Client> => {
    return elkClient;
};


export const getElasticClusterHealth = async (): Promise<ClusterHealthHealthResponseBody> => {
    return await elkClient.cluster.health();
};
