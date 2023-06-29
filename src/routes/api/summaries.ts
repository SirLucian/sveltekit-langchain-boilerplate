import { OPENAI_API_KEY } from '$env/static/private';
import { RecursiveCharacterTextSplitter } from 'langchain/dist/text_splitter';
import { PDFLoader } from 'langchain/document_loaders';
import { OpenAI } from 'langchain/llms/openai';
import { writeFile } from 'fs/promises';
import { getEmbeddingsFromDocs } from './embedding';

export const getSummary = async ({ request }) => {
	// Initialize the Model
	const model = new OpenAI({ temperature: 0, openAIApiKey: OPENAI_API_KEY });

	// Load the summarization chain
	const chain = model;
	// the analyzedocschain is used to summarize a single piece of text instead of chunks of text
	const res = await getEmbeddingsFromDocs({
		input_documents: request
	});

	return { success: true, summary: res.text };
};
