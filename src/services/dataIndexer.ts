import { Client as ElasticsearchClient } from '@elastic/elasticsearch';
import {getElasticClient} from "../utils/ElkUtil";
import {getPool} from "../utils/dbUtil";
import {Pool} from "pg";


const esIndexName: string = 'index_name';
const tableName: string ='table_name';
const batchSize: number = 10;

async function createIndex(client: Pool, esClient: ElasticsearchClient): Promise<void> {
  try {
    const clusterHealth = await esClient.cluster.health();
    console.log(clusterHealth);
    await esClient.indices.delete({index: esIndexName})
    const createIndexResponse = await esClient.indices.create({
      index: esIndexName,
      body: {
        settings: {
          number_of_shards: 5,
          number_of_replicas: 1,
          'index.max_result_window': 10000,
          analysis: {
            filter: {
              synonyms_filter: {
                type: 'synonym',
                synonyms_path: 'synonyms.txt',
                updateable: true,
              },
            },
            analyzer: {
              custom_analyzer: {
                type: 'custom',
                tokenizer: 'standard',
                filter: ['lowercase', 'synonyms_filter'],
              },
            },
          },
        },
      },
    });

    console.log(`Index "${esIndexName}" created successfully. Response:`, createIndexResponse);

    const indexStatus = await esClient.cat.indices({ index: esIndexName });
    console.log(indexStatus);
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

async function importDataToElasticsearch(client: Pool, esClient: ElasticsearchClient): Promise<void> {
  try {
    
    const result = await client.query(`SELECT * FROM ${tableName}`);

    const data = result.rows;
    console.log("data",data);
    const totalDocs = data.length;
    let processedDocs = 0;

    while (processedDocs < totalDocs) {
      const batch = data.slice(processedDocs, processedDocs + batchSize);

      const processedBatch = batch.map((doc:any)  => {
        for (const key in doc) {
          if (doc[key] === null) {
            doc[key] = 'empty';
          }
        }
        return doc;
      });

      const body = processedBatch.flatMap((doc:any) => [{ index: { _index: esIndexName } }, doc]);

      const bulkResponse = await esClient.bulk({ refresh: true, body, timeout: '5m' });

      if (bulkResponse && bulkResponse.errors) {
        console.error('Failed to import data to Elasticsearch:', bulkResponse.errors);
      } else {
        console.log(`Batch imported (${processedDocs + 1}-${processedDocs + batch.length}/${totalDocs}).`);
      }

      processedDocs += batchSize;
    }

    console.log(`Data imported to Elasticsearch index "${esIndexName}" successfully.`);
  } catch (error) {
    console.error('Error importing data to Elasticsearch:', error);
  }
}

export async function indexingData(): Promise<any> {
  const pgClient = await getPool()
  const esClient = await getElasticClient()

  try {
    await pgClient.connect();
    await esClient.ping();

    await createIndex(pgClient, esClient);
    await importDataToElasticsearch(pgClient, esClient);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pgClient.end();
    await esClient.close(); // Close the Elasticsearch client here
  }
}
