import { persona01 as dvPersonaBase } from "./dvPersonaBase.json";
import { pinecone } from "./pineconeDb.server";
import Together from "together-ai";
type PersonaEntry = { question: string; answer: string };
type Persona = PersonaEntry[];

export const initializeDarkVioletRetrieval = async () => {
  const index = pinecone.index("darkviolet");
  const namespace = "persona-base";
  const indexStats = await index.describeIndexStats();
  console.log("index stats", indexStats);
  const namespaces = indexStats.namespaces;
  const together = new Together({
    apiKey: process.env.TOGETHER_AI_API_KEY,
  });

  if (!namespaces || !Object.keys(namespaces).includes(namespace)) {
    const embeddings = await Promise.all(
      (dvPersonaBase as Persona).map(async (entry, index) => {
        const response = await together.embeddings.create({
          model: "WhereIsAI/UAE-Large-V1",
          input: entry.question,
        });
        return {
          id: index.toString(),
          values: response.data[0].embedding,
          metadata: { answer: entry.answer, text: entry.question },
        };
      })
    );
    await index.upsert(embeddings);
  }
  return index;
};

export const darkVioletRetrieval = async (query: string, minScore = 0.65) => {
  let index = await initializeDarkVioletRetrieval();
  console.log("namespace", await index.describeIndexStats());
  const together = new Together({
    apiKey: process.env.TOGETHER_AI_API_KEY,
  });
  const embedding = await together.embeddings.create({
    model: "WhereIsAI/UAE-Large-V1",
    input: query,
  });
  const results = await index.namespace("persona-base").query({
    vector: embedding.data[0].embedding,
    topK: 5,
    includeMetadata: true,
  });
  console.log("retrieval results", results);
  return results.matches
    .map((result) => ({
      question: result.metadata?.text,
      answer: result.metadata?.answer,
      score: result.score,
    }))
    .filter((result) => result.score && result.score > minScore);
};
