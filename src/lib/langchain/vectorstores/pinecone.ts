// langchain/pinecone.ts
import { initPinecone } from "../../../utils/pinecone-client.js"

import { PINECONE_NAME_SPACE } from "../../../config/pinecone"
import { OpenAIEmbeddings } from "langchain/embedings/"
import { PineconeStore } from "langchain/vectorstores.js"

export async function getPineconeStore(credentials, id) {
  const { openaiApiKey, pineconeEnvironment, pineconeIndex, pineconeApiKey } = credentials
  const pinecone = await initPinecone(pineconeEnvironment, pineconeApiKey)
  const index = pinecone.Index(pineconeIndex)

  /* create vectorstore*/
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: openaiApiKey, }),
    {
      pineconeIndex: index,
      textKey: "text",
      namespace: id || PINECONE_NAME_SPACE,
    }
  )

  return vectorStore
}