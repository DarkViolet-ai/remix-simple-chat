import {
  QueryResponse,
  Pinecone,
  type CreateIndexRequestMetricEnum,
} from "@pinecone-database/pinecone";
import { remember } from "@epic-web/remember";

export const pinecone = remember(
  "pinecone",
  () => new Pinecone({ apiKey: process.env.PINECONE_API_KEY! })
);

const defaultIndexName = "darkviolet";

export const createPineconeDb = async ({
  name = defaultIndexName,
  dimension,
  metric,
}: {
  name?: string;
  dimension: number;
  metric: CreateIndexRequestMetricEnum;
}) => {
  const db = await pinecone.createIndex({
    name,
    dimension,
    metric,
    suppressConflicts: true,
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-west-2",
      },
    },
  });
  return db;
};

export const insertVectors = async ({
  indexName = defaultIndexName,
  vectors,
  namespace,
}: {
  indexName?: string;
  vectors: {
    id: string;
    values: number[];
  }[];
  namespace?: string;
}) => {
  try {
    const index = namespace
      ? pinecone.index(indexName).namespace(namespace)
      : pinecone.index(indexName);

    const response = await index.upsert(vectors);
    return response;
  } catch (e) {
    // if (e instanceof PineconeNotFoundError) {
    await createPineconeDb({
      name: indexName,
      dimension: vectors[0].values.length,
      metric: "cosine",
    });
    const index = namespace
      ? pinecone.index(indexName).namespace(namespace)
      : pinecone.index(indexName);
    const response = await index.upsert(vectors);
    return response;
    // }
  }
};

export const deleteVectors = async ({
  indexName = defaultIndexName,
  vectorIds,
  namespace,
}: {
  indexName?: string;
  vectorIds: string[];
  namespace?: string;
}) => {
  const index = namespace
    ? pinecone.index(indexName).namespace(namespace)
    : pinecone.index(indexName);
  const response = await index.deleteMany(vectorIds);
  return response;
};

export const queryVectors = async ({
  indexName = defaultIndexName,
  query,
  namespace,
}: {
  indexName?: string;
  query: {
    vector: number[];
    topK: number;
    includeValues?: boolean;
  };
  namespace?: string;
}) => {
  const index = namespace
    ? pinecone.index(indexName).namespace(namespace)
    : pinecone.index(indexName);

  const response: QueryResponse = await index.query(query);
  return response;
};
