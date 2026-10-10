import { getModel } from "../utils/model.js";

export const routerNode =
async(state)=>{


if (

    state.agent &&

    state.agent !== "auto"

) {

    return {

        ...state,

        agent: state.agent

    };

}


if(state.file){

    if(

        state.file.mimetype.startsWith("image/")

    ){

        return{

            ...state,

            agent:"vision"

        };

    }

}

if(state.file){

    if(state.file.mimetype==="application/pdf"){

        return{

            ...state,

            agent:"pdf_rag"

        };

    }

}


 const llm =
 getModel("router");

 const result =
 await llm.invoke(`

You are an agent router.

Available agents:

- chat
- search
- coding
- pdf
- ppt
- image 

Rules:

chat:
General conversation,
explanations,
learning,
questions.

search:
Current events,
latest information,
news,
recent developments,
internet lookup.

coding:
Generate code,
debug code,
build projects,
architecture,
API design.

pdf:
Questions about generate PDFs
or document context.

ppt:
Questions about generate ppts
or ppt context.

Return ONLY one word:

chat
search
coding
pdf

User Query:

${state.prompt}

 `);

 return {

  ...state,

  agent:
  result.content
   .trim()
   .toLowerCase()

 };

};