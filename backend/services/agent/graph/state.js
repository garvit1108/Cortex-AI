import { Annotation } from "@langchain/langgraph";

export const AgentState =
Annotation.Root({

 prompt:
 Annotation(),

 conversationId:
 Annotation(),

 userId:
 Annotation(),

 agent:
 Annotation(),

 response:
 Annotation(),

 images:
  Annotation(),
 model:
 Annotation(),
  file:
 Annotation(),

 artifacts:
 Annotation(),

 searchResults:
 Annotation(),

 codeContext:
 Annotation(),

 pdfContext:
 Annotation()

});