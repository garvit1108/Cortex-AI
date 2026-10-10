import redis from "../../../shared/redis/redis.js";
import { graph } from "../graph/supervisor.graph.js";
import { addMessage } from "../utils/memory.js";
import axios from "axios"

export const chat =
async(req,res,next)=>{

 try{

  const {

   prompt,

   conversationId,

   agent

} = req.body;

console.log(req.body)
console.log(req.file)

await addMessage(
 conversationId,
 "user",
 prompt
);

await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
  conversationId,
  role:"user",
  content:prompt
})







  const result =
  await graph.invoke({

   prompt,

   conversationId,

   userId:
   req.headers[
    "x-user-id"
   ],
   agent,
   file:req.file

  });


  console.log("after res",result)

  await addMessage(
 conversationId,
 "assistant",
 result.response
);
await axios.post(
 `${process.env.CHAT_SERVICE}/save-message`,
 {
  conversationId,
  role:"assistant",
  content:result.response,
  images:result.images,
  artifacts:
  result.artifacts || []
 }
)

  return res.json({

 success:true,

 answer:
 result.response,
 images:result.images,
 artifacts:
 result.artifacts || []

});

 }catch(error){

  next(error)

 }

}