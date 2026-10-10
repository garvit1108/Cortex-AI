import { checkAgentLimit } from "../config/agentRateLimit.js";
import { searchTool } from "../utils/tavily.js";



export const searchAgent =
async(state)=>{
await checkAgentLimit(
    state.userId,
    "search"
  );
 try{

  const results =
  await searchTool.invoke({

 query:state.prompt

} );

console.log(results)

  return {

   ...state,

   searchResults:
   results,
   

  };

 }catch(error){

  console.log(error);

  return {

   ...state,

   searchResults:[]

  };

 }

};