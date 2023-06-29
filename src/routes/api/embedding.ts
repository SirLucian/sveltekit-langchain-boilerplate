import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

export async function getEmbeddingsFromDocs({ req, res }) {
	const chunks = await JSON.stringify(req);
	/* Create instance */
	const embeddings = new OpenAIEmbeddings();

	/* Embed queries */
	res = await embeddings.embedDocuments({ chunks });
	return res;
}
