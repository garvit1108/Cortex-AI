import redis from "../../../shared/redis/redis.js";
import { getConversationHistory } from "./getConv.js";


export const getMemory =
async(conversationId)=>{

 const key =
 `conversation:${conversationId}`;

 const cached =
 await redis.get(key);

 if(cached){

  return JSON.parse(
   cached
  );

 }

 const messages =
 await getConversationHistory(
  conversationId
 );

 await redis.set(

  key,

  JSON.stringify(
   messages
  ),

  "EX",

  86400

 );

 return messages;

};


export const addMessage =
async(
 conversationId,
 role,
 content
)=>{

 const key =
 `conversation:${conversationId}`;

 const existing =
 await redis.get(key);

 const messages =
 existing
 ? JSON.parse(existing)
 : [];

 messages.push({
  role,
  content
 });

 if(messages.length > 20){

  messages.shift();

 }

 await redis.set(

  key,

  JSON.stringify(
   messages
  ),

  "EX",

  86400

 );

}