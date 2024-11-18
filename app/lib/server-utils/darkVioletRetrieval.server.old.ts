import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";
import { Document } from "@langchain/core/documents";
import { persona01 as dvPersonaBase } from "./dvPersonaBase.json";
import { PineconeStore } from "@langchain/pinecone";
import { pinecone } from "./pineconeDb.server";
type PersonaEntry = { question: string; answer: string };
type Persona = PersonaEntry[];

export const darkVioletRetrieval = async (query: string) => {
  const vectorStore = await initializeDarkVioletRetrieval();
  console.log("running query on vector store");
  const results = await vectorStore.similaritySearchWithScore(query, 5);
  console.log("retrieval results", results);
  return results
    .map(([result, score]) => ({
      question: result.pageContent,
      answer: result.metadata.answer,
      score,
    }))
    .filter((result) => result.score > 0.65);
};

export const initializeDarkVioletRetrieval = async () => {
  const index = pinecone.index("darkviolet");
  const namespace = "persona-base";
  const indexStats = await index.describeIndexStats();
  const namespaces = indexStats.namespaces;
  if (!namespaces || !Object.keys(namespaces).includes(namespace)) {
    const personaDocs = (dvPersonaBase as Persona).map(
      (entry) =>
        new Document({
          pageContent: entry.question,
          metadata: { answer: entry.answer },
        })
    );

    const vectorStore = new PineconeStore(
      new TogetherAIEmbeddings({
        modelName: "WhereIsAI/UAE-Large-V1",
      }),
      {
        pineconeIndex: index,
        namespace,
      }
    );
    const sliceSize = 5;

    for (
      let startIndex = 0;
      startIndex < personaDocs.length;
      startIndex += sliceSize
    ) {
      console.log("creating index slice", startIndex);
      await vectorStore.addDocuments(
        personaDocs.slice(startIndex, startIndex + sliceSize),
        {
          // ids will be an array of sliceSize numbers starting from startIndex
          ids: Array.from({ length: sliceSize }, (_, i) => startIndex + i).map(
            (i) => i.toString()
          ),
        }
      );
    }
    return vectorStore;
  }
  return new PineconeStore(
    new TogetherAIEmbeddings({
      modelName: "WhereIsAI/UAE-Large-V1",
    }),
    {
      pineconeIndex: index,
      namespace,
    }
  );
};
