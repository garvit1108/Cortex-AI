import axios from "axios";

export const getConversationHistory =
async(conversationId)=>{

 const response =
 await axios.get(

 `${process.env.CHAT_SERVICE}/get-messages/${conversationId}`

 );

 return response.data;

};