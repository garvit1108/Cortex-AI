import fs from "fs";
import {PDFParse} from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createVectorStore } from "../utils/vectorStore.js";
import {
  HumanMessage,
  SystemMessage
} from "@langchain/core/messages";

import { getModel }
from "../utils/model.js";
import { QdrantVectorStore } from "@langchain/qdrant";
export const pdfRagAgent = async (state) => {

  try {

    const buffer =
      fs.readFileSync(
        state.file.path
      );

    const pdf =
      new PDFParse({

        data: buffer

      });

    const result =
      await pdf.getText();

    const text =
      result.text;

    const splitter =
      new RecursiveCharacterTextSplitter({

        chunkSize: 1000,

        chunkOverlap: 200

      });

    const docs =
      await splitter.createDocuments([

        text

      ]);

   const collectionName =
`pdf-${Date.now()}`;

const vectorStore =await createVectorStore(

collectionName,

docs

);

const relevantDocs =
await vectorStore.similaritySearch(

    state.prompt,

    5

);
console.log(relevantDocs);
const context =
relevantDocs

.map(doc=>doc.pageContent)

.join("\n\n");
const llm =getModel("pdf-rag");

    const messages=[

new SystemMessage(`

You are CortexAI PDF Assistant.

Rules:

- Answer ONLY from the uploaded PDF.

- Never make up information.

- If the answer is not present in the PDF, reply:

"I couldn't find this information in the uploaded PDF."

- Use Markdown formatting.

`),

new HumanMessage(`

Context:

${context}

Question:

${state.prompt}

`)
];


const response =
await llm.invoke(
    messages
);


    return {

      ...state,

      docs,

      response:
response.content
    };

    



  }

 finally{

    try{

        fs.unlinkSync(
            state.file.path
        );

        await QdrantVectorStore.deleteCollection(

            collectionName

        );

    }

    catch(err){

        console.log(err.message);

    }

}

};